const express = require('express');
const passport = require('passport');

const router = express.Router();
const reportsController = require("../../../controllers/api/v1/reports_api");

router.get('/:status', passport.authenticate('jwt', {session:false}), reportsController.findByStatus);      // find all reports, by a particular status

module.exports = router;

