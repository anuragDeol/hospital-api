const express = require("express");
const router = express.Router();

const doctorsController = require('../../../controllers/api/v1/doctors_api');

router.post('/register', doctorsController.register);       // doctor registration
router.post('/login', doctorsController.login);     // doctor login


module.exports = router;

