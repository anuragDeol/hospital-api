const express = require("express");
const router = express.Router();

const doctorsController = require('../../../controllers/api/v1/doctors_api');

router.post('/register', doctorController.register);
router.post('/login', doctorController.login);


module.exports = router;

