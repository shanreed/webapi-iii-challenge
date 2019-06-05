const express = require('express');

const Posts = require('./postDb');
const Users = require('../users/userDb');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Posts Router!');
  next();
});


router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;