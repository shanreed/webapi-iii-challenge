const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

const server = express();

//Middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(customLogger);


server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function customLogger(req, res, next) {
 console.log(`Method ${req.method}, Url ${req.url}, Date ${new Date().toISOString()} `)
 next();
};

module.exports = server;
