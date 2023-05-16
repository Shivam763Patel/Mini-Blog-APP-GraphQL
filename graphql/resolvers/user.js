const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserInputError }  = require ('apollo-server')
// const { validateRegisterInput } = require('../../util/validators')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')

function generateToken(user)
{
    return jwt.sign( {

        id: user.id,
        email: user.email,
        username: user.username
    },
    SECRET_KEY,
    {
        expiresIn: '12 h'
    });
}
module.exports = 
{
    Mutation:


{

        async login(_, { username, password})
        {

            const user = await User.findOne({ username})

            if(!user)
            {

                throw new UserInputError('Wrong creddntials')
                 
            }

           const match = await bcrypt.compare(password, user.password)
           if(!match)
            {

                throw new UserInputError('Wrong creddntials')
                 
            }
            const token = generateToken(user)

            return{
                ...user._doc,
                id: user._id,
                token

            }

        },

        async register(_,
            
            { 
                registerInput:  { username, email, password, confirmpassword}
            } ,
            
        ) 

        {
            //Validate user data

            // const { errors } = validateRegisterInput(username, email, password, confirmpassword);

            // if(!valid)
            // {
            //     throw new UserInputError('Errors', { errors});
            // }
            //Check user is already added or not
            const user = await User.findOne( { username });

            if(user)
            {

                throw new UserInputError('Username is already registered, please enter another ', {

                    errors: {
                        username: 'Username is already registered, please enter another'
                    }
                })
            }
            //Hash password and create Auth token
            password = await bcrypt.hash(password, 12 )

            const newUser = new User({

                email,
                username,
                password

            })

            const res = await newUser.save();

            const token = generateToken(res)

            return{
                ...res._doc,
                id: res._id,
                token

            }
        }
    }
}