const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation,
} = require('../controllers/auth-validation');

router.post('/register', async (req, res) => {
  //Validating
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  //EmailExist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  //password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //new user model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //add to db
  try {
    const savedUser = await user.save();
    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error);

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(401).send('email or  password not correct !!');

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send('Invalid Password!!?');

  const token = jwt.sign({ _id: user._id }, process.env.SERVER_TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});
module.exports = router;
