const { Post } = require('../models');
// post seeds
const postdata = [
  {
    postTitle: 'Post 1',
    postContent: 'This is the first post',
    userId: 1,
  },
  {
    postTitle: 'Post 2',
    postContent: 'This is the second post',
    userId: 2,
  },
  {
    postTitle: 'Post 3',
    postContent: 'This is the third post',
    userId: 3,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
