const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    body: 
    {
        type: String,
        required: true,

    },

    username: 
    {
        type: String,
        required: true,

    },

    comments: 
    [
        {
            body:
            {
                type: String,
            },

            username: 
            {
                type: String,

            },



        }

    ],

    likes: 
    [

        {

            username:
            {
                type: String
            }

        }
    ],

    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }

},
    {
         timestamps: true 
    }
)

module.exports = mongoose.model("GraphQLMiniBlogApp_Post",postSchema)
