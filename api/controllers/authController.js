'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

const jwtSecret = require('../../env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');

const crypto = require('crypto');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.username) {
            errors.push('Missing username field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing username and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: 'Such user does not exist' });
            } else {
                let passwordFields = user.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                        req.body = {
                            userId: user._id,
                            username: user.username,
                            role: user.role,
                            name: user.name + ' ' + user.surname,
                        };
                        return next();
                } else {
                        return res.status(400).send({message: 'Invalid username or password'});
                }
            }
        })
}

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
 
exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send({
                    message: "Unauthorized"
            });
            } else {
                req.jwt = jwt.verify(authorization[1], jwtSecret);
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send({
            message: "Wrong headers"
        });
    }
}; 

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.role);
        if (user_permission_level >= required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
}

exports.minimumPermissionLevelRequiredMatchUserId = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.role);
        if ((user_permission_level > required_permission_level) || 
        ((user_permission_level == required_permission_level) && (req.params.userId == req.jwt.userId))) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};