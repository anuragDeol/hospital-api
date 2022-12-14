const express = require("express");
const router = express.Router();
const passport = require('../../../config/passport-jwt-strategy');

const patientsController = require('../../../controllers/api/v1/patients_api');
const reportsController = require('../../../controllers/api/v1/reports_api');

// patient routes are protected - can only be accessed by doctors
router.post('/register', passport.authenticate('jwt', {session:false}), patientsController.register);       // register new patient
router.post('/:id/create_report', passport.authenticate('jwt', {session:false}), reportsController.create);     // create new report for a patient
router.get('/:id/all_reports', passport.authenticate('jwt', {session: false}), reportsController.findAll);     // find all reports of a patient

module.exports = router;
