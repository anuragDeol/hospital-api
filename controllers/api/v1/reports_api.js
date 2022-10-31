const Report = require('../../../models/report');
const Patient = require('../../../models/patient');

module.exports.createReport = async function(req, res) {
    try {
        if(req.body.status == undefined) {
            return res.status(206).json({
                message: "Please provide complete information and try again"
            });
        }

        let report = await Report.create({
            doctor: req.user._id,
            status: req.body.status,
            patient: req.params.id
        });

        let patient = await Patient.findById(req.params.id);

        patient.reports.push(report);
        await patient.save();

        // populate doesn't work with '.create()'
        // thus, finding the report (create just now)
        // and, populate it
        let newReport = await Report.findById(report._id).populate('doctor');

        return res.status(200).json({
            message: "Success! Report for the patient created.",
            data: {
                createBy: report.doctor.username,
                status: newReport.status,
                createdOn: newReport.createdAt.toDateString(),
                patientDetails: {
                    name: patient.name,
                    age: patient.age,
                    gender: patient.gender,
                    phone: patient.phone
                }
            }
        });
    } catch(error) {
        console.log(error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.findAll = async function(req, res) {
    try {
        // finding the patient, then populating its report field and report's doctor field
        let patient = await Patient.findById(req.params.id)
        .populate({
            path: 'reports',
            // sort reports - oldest to newest
            options: {
                sort: {
                    'createdAt': 1
                }
            },
            populate: {
                path: 'doctor'
            }
        });

        return res.status(200).json({
            message: "Success! Reports for the requested patient found",
            data: {
                patient: patient
            }
        });
    } catch(error) {
        console.log(error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.findByStatus = async function(req, res) {
    try {
        // finding report by status and populating its doctor and patient field
        let reports = await Report.find({
            status: req.params.status
        })
        .populate('doctor')
        .populate('patient');


        return res.status(200).json({
            message: "Reports of patients with status " + req.params.status,
            data: {
                reports: reports
            }
        });
    } catch(error) {
        console.log(error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}








