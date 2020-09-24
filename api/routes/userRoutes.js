'use strict';

module.exports = function(app) {
    var users = require('../controllers/userController');

    app.route('/users')
        .get(users.list_users)
        .post(users.create_user);

    app.route('/users/:userId')
        .get(users.read_user)
        .put(users.update_user)
        .delete(users.delete_user);
    
    app.route('/users/:userId/lectures')
        .get(users.list_lectures);
        // .post(users.create_lecture);
    
    app.route('/users/:userId/lectures/:lectureId')
        .get(users.read_lecture);
        // .put(users.update_lecture)
        // .delete(users.delete_lecture);
};