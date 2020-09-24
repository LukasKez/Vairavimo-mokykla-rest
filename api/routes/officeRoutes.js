'use strict';

module.exports = function(app) {
    var offices = require('../controllers/officeController');

    app.route('/offices')
        .get(offices.list_offices)
        .post(offices.create_office);

    app.route('/offices/:officeId')
        .get(offices.read_office)
        .put(offices.update_office)
        .delete(offices.delete_office);
    
    app.route('/offices/:officeId/users')
        .get(offices.list_users);
        // .post(offices.create_user);
    
    app.route('/offices/:officeId/users/:userId')
        .get(offices.read_user);
        // .put(offices.update_user)
        // .delete(offices.delete_user);
};