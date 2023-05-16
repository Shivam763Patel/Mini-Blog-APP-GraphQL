const jwt = require("jsonwebtoken")
const { AuthenticationError } = require ('apollo-server')

const {  SECRET_KEY } = require('../config') 

module.exports = (context) => {

    const authHeader = context.req.headers.authorization;
    if(authHeader)
    {
        //Bearer
        const token = authHeader.split('Bearer ')[1];

        if(token)
        {

            try
            {
                const user = jwt.verify(token,  SECRET_KEY );
                return user
            }
            catch(error)
            {
                throw new AuthenticationError('Invalid or expired token');

            }
        }

        throw new Error('Authentication token must be include ')
    }
    throw new Error('Authorization header must be  provided ')

}