var express = require('express');
var router = express.Router();
const User = require('../Models/user');
const UsersService = require('../Services/users')
const usersService = new UsersService();


/* GET users listing. */
router.get('/', async function(req, res, next) {
    usersService.getAllUsers()
        .then(users => {
          res.json(users);
        }).catch( err => {
          res.status(500).send({
            message : err.message || 'error'
          })
    })
});

// Return a user by ID (GET)
router.get('/:id', async (req, res) => {
    usersService.getUserById(req.params.id)
        .then(user => {
          res.json(user);
        }).catch( err => {
          res.status(500).send({
          message : err.message || 'error'
        })
    })
});


// Saving a new user (POST)
router.post('/', async (req, res) => {
    usersService.getUserByUsername(req.body.username)
        .then(user => {
            console.log(user);
            if (user != null ) {
             res.status(409).json({
                 message: 'user already exists!'
             })
            }
            else {
                usersService.createUser(req.body)
                    .then(user => {
                        res.json(user);
                    }).catch( err => {
                    res.status(500).send({
                        message : err.message || 'error'
                    })
                })
            }
        }).catch( err => {
        res.status(500).send({
            message : err.message || 'error'
        })
    })
});

module.exports = router;
