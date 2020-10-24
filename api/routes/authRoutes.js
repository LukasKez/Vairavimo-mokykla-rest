'use strict';

module.exports = function(app) {
    var auth = require('../controllers/authController');

    app.route('/auth')
        .post([
            auth.hasAuthValidFields,
            auth.isPasswordAndUserMatch,
            auth.login
        ]);
};