'use strict';

module.exports = function(app) {
    var lectures = require('../controllers/lectureController');
    const auth = require('../controllers/authController');
    const config = require('../../env.config');

    const STUDENT = config.permissionLevels.STUDENT;
    const LECTURER = config.permissionLevels.LECTURER;
    const ADMIN = config.permissionLevels.ADMIN;

    app.route('/lectures')
        .get(lectures.list_lectures)
        .post([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(LECTURER),
            lectures.create_lecture
        ]);

    app.route('/lectures/:lectureId')
        .get(lectures.read_lecture)
        .put(lectures.update_lecture)
        .delete(lectures.delete_lecture);
    
    app.route('/lectures/:lectureId/users')
        .get(lectures.list_users);
    
    app.route('/lectures/:lectureId/users/:userId')
        .get(lectures.read_user);
};