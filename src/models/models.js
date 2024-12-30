import User from './user.js';
import Post from './post.js';

const models = {
  User,
  Post,
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

export default models;
