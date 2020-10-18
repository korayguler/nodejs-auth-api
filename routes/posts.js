const router = require('express').Router();
const verify = require('./verify');

router.get('/', verify, (req, res) => {
  res.json({
    posts: {
      title: 'test > 1',
      content: 'test content > 1',
    },
  });
});

module.exports = router;
