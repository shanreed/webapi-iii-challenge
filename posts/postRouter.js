const express = require('express');

const postDb = require('./postDb');
const userDb = require('../users/userDb');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Posts Router!');
  next();
});


router.get('/', async(req, res) => {
  try {
      const posts = await postDb.get(req.query);
        res.status(200).json(posts);
      } catch (err) {
          console.log(err);
        res.status(500).json({ message: "Error getting posts" });
  }

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