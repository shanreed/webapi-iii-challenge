const express = require ('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

const router = require('express').Router();

//Post user
router.post('/', async (req, res) => {
    try {
      const user = await userDb.insert(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding user" });
    }

});

router.post('/:id/posts', (req, res) => {

});

//Get Users
router.get('/', async (req, res) => {
    try {
      const users = await userDb.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting user" });
    }
});

//Get users by id 
router.get('/:id', validateUserId, async (req, res) => {
 try {
   const user = await userDb.getById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "User id not found"})
      }
 }  catch(err) {
    console.log(err);
    res.status(500).json({meaasge: 'Error getting id'})
 }
});

//Get Post By Id
router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const post = await userDb.getUserPosts(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Error getting post'})
  }

});

//DELETE
router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const count = await userDb.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({message: 'User has been Deleted'})
        } else {
        res.status(404).json({ message: 'No user can be found'})
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Error deleting user'})
  }
});

router.put('/:id', validateUserId, async (req, res) => {
  try {
      const user = await userDb.update(req.params.id);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({message: 'No such user found'});
        }
  } catch(err) {
    console.log(error);
    res.status(500).json({message: 'Error updating user'});
  }

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
        } else if (req.body.name && Object.keys(req.body.name).length > 0){
        next();
        } else {
        res.status(400).json({ message: "missing required name field"},{ message: "missing user data" });
        }
};

function validatePost(req, res, next) {
    if (req.body && Object.keys(req.body).length > 0) {
        next();
        } else if (req.body.text && Object.keys(req.body.text).length > 0) {
            next();
        } else {
        res.status(400).json({ message: "missing post data"}, { message: "missing required text field" });
      }

};

module.exports = router;