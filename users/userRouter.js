const express = 'express';
const userDb = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const userId = req.params;
    userDb.getById(userId)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "invalid user id" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


function validateUser(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next();
        } else if (req.name && Object.keys(req.name).length > 0){
        res.status(400).json({ message: "missing user data" });
        } else {
        res.status(400).json({ message: "missing required name field"});
        }
};

function validatePost(req, res, next) {

};

module.exports = router;
