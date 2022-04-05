const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts on dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // store db query results in variable
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User],
    });
    // map all post data to seperate posts
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // render dashboard layout with posts
    res.render('all-posts', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    //   redirect to login if there's an error
    res.redirect('login');
  }
});

// route for clicking on new post button
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// route for when the post is clicked on
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // save results of query to variable
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      // if no results set status to 404
      res.status(404).end();
    }
  } catch (err) {
    //   if error redirect to login
    res.redirect('login');
  }
});

module.exports = router;
