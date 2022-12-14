const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.register = async function(req, res) {
    console.log(req.body);
    
    try {
        let doctor = await Doctor.findOne({
            username: req.body.username
        });

        if(!doctor) {
            doctor = await Doctor.create({
                username: req.body.username,
                password: req.body.password
            });

            // converts document to js object - prevent password to be returned in json response
            doctor = doctor.toObject();
            delete doctor.password;

            return res.json(201, {
                message: "Registered Successfully!",
                data: {
                    doctor: doctor
                }
            });
        } else {
            doctor = doctor.toObject();     // convert into json object
            delete doctor.password;

            return res.json(409, {
                message: "A doctor with given credentials already exists. Try signing in.",
                data: {
                    doctor: doctor
                }
            });
        }
    } catch(error) {
        console.log("Failed! Error occured in registration", error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.login = async function(req, res) {
    try {
        let doctor = await Doctor.findOne({
            username: req.body.username
        });

        if(!doctor || doctor.password != req.body.password) {
            return res.json(401, {
                message: "Invalid username and/or password"
            });
        }

        return res.status(200).json({
          message: "Success! You are signed in.",
          data: {
            // converting doctor to json - with a secret key for decryption and expiry time is 1hr
            token: jwt.sign(doctor.toJSON(), "hospital-api-secret-key", {expiresIn: "3600000"}),
          }
        });


    } catch(error) {
        console.log(error);
        return res.json(500, {
            message: "Internal server error"
        });
    }
}







