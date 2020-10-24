const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const $port = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(cors());

//Database Connection
mongoose.connect(
  process.env.SERVER_DB_CONNECTOR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to DB!'),
);

//import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);
//server
app.listen($port, () => {
  console.log(`server running ${process.env.SERVER_BASE_URL}:${$port}`);
});
