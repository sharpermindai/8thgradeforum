import HttpError from '@wasp/core/HttpError.js'

export const getUser = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + id);

  return user;
}

export const getPosts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Post.findMany();
}

export const getComments = async ({ postId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const comments = await context.entities.Comment.findMany({
    where: { postId },
    include: { post: true }
  });

  return comments;
}