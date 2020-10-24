'use strict';

module.exports = function(app) {
    var offices = require('../controllers/officeController');
    const auth = require('../controllers/authController');
    const config = require('../../env.config');

    const STUDENT = config.permissionLevels.STUDENT;
    const LECTURER = config.permissionLevels.LECTURER;
    const ADMIN = config.permissionLevels.ADMIN;

    app.route('/offices')
        .get(offices.list_offices)
        .post([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(ADMIN),
            offices.create_office
        ]);

    app.route('/offices/:officeId')
        .get([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(STUDENT),
            offices.read_office
        ])
        .put([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(ADMIN),
            offices.update_office
        ])
        .delete([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(ADMIN),
            offices.delete_office
        ]);
    
    app.route('/offices/:officeId/users')
        .get([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(LECTURER),
            offices.list_users
        ]);
    
    app.route('/offices/:officeId/users/:userId')
        .get([
            auth.validJWTNeeded,
            auth.minimumPermissionLevelRequired(LECTURER),
            offices.read_user
        ]);
};