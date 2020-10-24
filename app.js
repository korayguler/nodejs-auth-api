const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

//Database Connection
mongoose.connect(
  process.env.SERVER_DB_CONNECTOR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'),
);

//import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const homeRoute = require('./routes/home');
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
//server
app.listen(PORT, () => {
  console.log(`server running ${process.env.SERVER_BASE_URL}:${PORT}`);
});
