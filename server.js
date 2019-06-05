const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/post', postsRouter);
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
 console.log(`${req.method}, ${req.url}, ${new Date().toISOString()} `)
 next();
};

module.exports = server;
