const router = require('express').Router();
const { User } = require('../../models');

// create new user account
router.post('/', async (req, res) => {
  try {
    //   save new username and pw to variable
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    // save to session and set loggedin to true
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    //   catch error
    res.status(500).json(err);
  }
});

// log in route

router.post('/login', async (req, res) => {
  try {
    //   find user by username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      // if no user found for that name, respond with message
      res.status(400).json({ message: 'No user with this username found' });
      return;
    }
    // check if pw is valid
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No account found' });
      return;
    }
    // save session info
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'Log in sucessful' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// log out route

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    //   destroy the session if they're logged in already
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
