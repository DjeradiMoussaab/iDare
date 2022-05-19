const User = require('../Models/user');
let usersService = class usersService {

    getAllUsers() {
        return User.find({});
    }
    getUserByUsername(username) {
        return User.findOne({"username": username
        });
    }

    createUser(user, hash, salt) {
        return User.create({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            nbFollowers: 0,
            nbFollowing: 0,
            nbPosts: 0,
            photoURL: user.photoURL,
            hash: hash,
            salt: salt,
        });
    }

}

module.exports = usersService;