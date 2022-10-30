const express = require("express");
const router = express.Router();

const patientsController = require('../../../controllers/api/v1/patients_api');
const reportsController = require('../../../controllers/api/v1/reports_api');

// patient routes are protected an can only be access by doctors
router.post('register', passport.authenticate('jwt', {session:false}), patientsController.register);
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), reportsController.create);
router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), reportsController.findAll);     // finds all reports

module.exports = router;
