const { UserInputError } = require('apollo-server')

const postResolvers = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

const Post = require("../../models/Post")

module.exports = {
    Mutation:
    {
        createComment: async (_,
            { postId, body }, context ) => {

                const user = checkAuth(context)

                if(body.trim() === '')
                {
                throw new UserInputError('Empty comment',
                {
                    errors:
                    {
                        body: 'Comment body must not empty'
                    }
                })
            }

            const post = await Post.findById(postId)
            
            if(post)
            {
                post.comments.unshift({

                    body,
                    username

                })

                await post.save()
                return post
            }
            else throw new UserInputError('Post not found')
            }

    }
}
