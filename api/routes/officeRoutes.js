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
};