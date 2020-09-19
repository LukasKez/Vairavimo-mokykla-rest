'use strict';

module.exports = function(app) {
    var lectures = require('../controllers/lectureController');

    app.route('/lectures')
        .get(lectures.list_lectures)
        .post(lectures.create_lecture);

    app.route('/lectures/:lectureId')
        .get(lectures.read_lecture)
        .put(lectures.update_lecture)
        .delete(lectures.delete_lecture);
};