const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const $port = process.env.SERVER_PORT || 1234;

//Middleware
app.use(express.json());

//Database Connection
mongoose.connect(
  process.env.SERVER_DB_CONNECTOR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'),
);

//import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
//server
app.listen($port, () => {
  console.log(`server running ${process.env.SERVER_BASE_URL}:${$port}`);
});
