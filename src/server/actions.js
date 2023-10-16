import HttpError from '@wasp/core/HttpError.js'

export const banUser = async ({ userId }, context) => {
  if (!context.user || !context.user.isAdmin) { throw new HttpError(403) }

  return context.entities.User.update({
    where: { id: userId },
    data: { isBanned: true }
  })
}

export const unbanUser = async ({ id }, context) => {
  if (!context.user || !context.user.isAdmin) { throw new HttpError(403) };

  return context.entities.User.update({
    where: { id },
    data: { isBanned: false }
  });
}

export const verifyUser = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id }
  });

  if (!user) { throw new HttpError(404) };

  if (!context.user.isAdmin) { throw new HttpError(403) };

  return context.entities.User.update({
    where: { id },
    data: { isVerified: true }
  });
}

export const unverifyUser = async ({ id }, context) => {
  if (!context.user.isAdmin) { throw new HttpError(403) }

  return context.entities.User.update({
    where: { id },
    data: { isVerified: false }
  })
}

export const createPost = async ({ title, content, section }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.create({
    data: {
      title,
      content,
      section,
      userId: context.user.id
    }
  });

  return post;
}

export const createComment = async ({ content, postId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
  });

  if (!user.isVerified || user.isBanned) { throw new HttpError(403) };

  const post = await context.entities.Post.findUnique({
    where: { id: postId },
  });

  if (!post) { throw new HttpError(404) };

  return context.entities.Comment.create({
    data: {
      content,
      user: { connect: { id: context.user.id } },
      post: { connect: { id: postId } },
    },
  });
}
