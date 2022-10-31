const Patient = require('../../../models/patient');


module.exports.register = async function(req, res) {
    try {
        if(req.body.phone==undefined || req.body.name==undefined || req.body.age==undefined || req.body.gender==undefined) {
            return res.status(206).json({
                message: "Please provide all the fields to continue"
            });
        }

        let patient = await Patient.findOne({
            phone: req.body.phone
        });

        if(!patient) {
            let newPatient = await Patient.create(req.body);

            return res.status(201).json({
                message: "Patient registration successful!",
                data: {
                    patient: newPatient
                }
            });
        } else {
            return res.status(200).json({
                message: "Patient already registered. Try logging in",
                data: {
                    patient: patient
                }
            });
        }
    } catch(error) {
        console.log(error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}






