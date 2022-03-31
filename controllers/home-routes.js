const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// route to get all posts
router.get('/', async (req, res) => {
  try {
    // get all posts and include user model
    const postData = await Post.findAll({
      include: [User],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // render all posts
    res.render('all-posts-admin', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    //   find one post by Id and save to postData variable
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } else {
      // if no results, set 404 status
      res.status(404).end();
    }
    // catch error
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for login, redirect to dashboard if logged in, if not then render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// route for login, redirect to dashboard if logged in, if not then render signup page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
