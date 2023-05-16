const Post = require("../../models/Post")
const { UserInputError }  = require ('apollo-server')
const { AuthenticationError } = require ('apollo-server')
const checkAuth = require("../../util/check-auth")

module.exports = 
{
  

        Query:{
    
           async getPosts ()
           {
            try
            {
    
                const posts = await Post.find().sort({ createdAt: -1});
                console.log("post data",posts)
                return posts
            }
    
            catch(error)
            {
    
                throw new Error(error)
            }
           },

           async getPost(_,
                { 
                    postId
                })

            {

                try{

                    const post = await Post.findById(postId)
                    if(post)
                    {
                        return post
                    }
                    else
                    {
                        throw new UserInputError('Post not found')
                    }
                }
                catch(error)
                {
                    throw new UserInputError('Post not found')
                }
            }

        },


        Mutation:
        {

            async createPost(_, { body }, context) 
            {
                const user = checkAuth(context)
                console.log("user data",user)

                const newPost = new Post({

                    body,
                    user: user.id,
                    username:user.username,
                    
                })

                const post = await newPost.save();
                return post
            },

            async deletePost(_,
                
                { postId }, context)
                {
                    const user = checkAuth(context)

                    try
                    {
                        const post = await Post.findById(postId)
                        if(user.username === post.username)
                        {
                            await post.deleteOne();
                            return 'Post deteled successfully'
                        }
                        else{
                            throw new AuthenticationError('Action not allowed')
 
                        }
                    }
                    catch(error)
                    {
                        throw new Error(error)
                    }
                }
           
        }


}