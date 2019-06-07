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
  const  id  = req.params;
  PostDb.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
      } else {
        res.status(404).json({ message: "No post with that id was found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting post." });
    });
}
module.exports = router;