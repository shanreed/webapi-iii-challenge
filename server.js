const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');


const postsRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter')

const server = express();

//Middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use(customLogger);


server.use('/api/post', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function customLogger(req, res, next) {
 console.log(`${req.method}, ${req.url}, ${new Date().toISOString()} `)
 next();
};

module.exports = server;
