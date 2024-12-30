import models from '../models/models.js';

export const getPostBySlug = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    const post = await models.Post.findOne({
      where: { slug },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.set('Cache-Control', 'public, max-age=600, stale-if-error=172800').status(200).json(post);
  } catch (error) {
    next(error);
  }
};
