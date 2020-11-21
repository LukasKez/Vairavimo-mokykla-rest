'use strict';

module.exports = function(app) {
    const users = require('../controllers/userController');
    const auth = require('../controllers/authController');
    const config = require('../../env.config');

    const STUDENT = config.permissionLevels.STUDENT;
    const LECTURER = config.permissionLevels.LECTURER;
    const ADMIN = config.permissionLevels.ADMIN;

    app.route('/users')
        .get([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequired(LECTURER),
            users.list_users
        ])
        .post([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequired(ADMIN),
            users.create_user
        ]);

    app.route('/users/:userId')
        .get([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequiredMatchUserId(STUDENT),
            users.read_user
        ])
        .put([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequiredMatchUserId(STUDENT),
            users.update_user
        ])
        .delete([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequired(ADMIN),
            users.delete_user
        ]);
    
    app.route('/users/:userId/lectures')
        .get([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequiredMatchUserId(STUDENT),
            users.list_lectures
        ]);
    
    app.route('/users/:userId/lectures/:lectureId')
        .get([
            //auth.validJWTNeeded,
            //auth.minimumPermissionLevelRequiredMatchUserId(STUDENT),
            users.read_lecture
        ]);
};