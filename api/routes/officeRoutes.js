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
    
    // TODO: implement hierarchy endpoints
    app.route('/offices/:officeId/lectures/:lectureId')
        .get(function (req, res) {
            res.json({
                message: 'Office\'s lecture information here',
                officeID: req.params.officeId,
                lectureID: req.params.lectureId
            });
        })

};