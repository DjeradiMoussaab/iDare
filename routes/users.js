var express = require('express');
var router = express.Router();
const User = require('../Models/user');
const utils = require('../Config/utils');
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

/* GET user by username. */
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


/* POST create new user. */
router.post('/register', async (req, res) => {
    usersService.getUserByUsername(req.body.username)
        .then(user => {
            console.log(user);
            if (user != null ) {
                res.status(409).json({
                    message: 'user already exists!'
                })
            }
            else {
                const saltHash = utils.genPassword(req.body.password);
                const salt = saltHash.salt;
                const hash = saltHash.hash;
                usersService.createUser(req.body,hash,salt)
                    .then(user => {
                        res.json({ success: true, user: user });
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

/* POST login existing user. */
router.post('/login', function(req, res, next){
    usersService.getUserByUsername(req.body.username)
        .then(user => {
            console.log(user);
            if (user == null ) {
                res.status(409).json({
                    message: 'user does not exists!'
                })
            }
            else {
                const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
                if (isValid) {
                    const tokenObject = utils.issueJWT(user);
                    res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
                } else {
                    res.status(401).json({ success: false, msg: "your password is incorrect" });
                }
            }
        }).catch( err => {
        res.status(500).send({
            message : err.message || 'error'
        })
    })
});

module.exports = router;
