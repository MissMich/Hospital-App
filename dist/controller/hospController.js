"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatients = exports.updatePatientInfo = exports.UpdatePatients = exports.getPatientInfo = exports.getOne = exports.getPatients = exports.Users = void 0;
const patients_1 = require("../model/patients");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const usersModel_1 = require("../model/usersModel");
async function Users(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validateResult = utils_1.createPatientSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await patients_1.PatientsInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        // res.status(201);
        // res.json({
        //     message:"You have successfully registered a patient.",
        //     record
        // })
        res.redirect('/dashboard');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create',
            route: '/create'
        });
    }
}
exports.Users = Users;
async function getPatients(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await patients_1.PatientsInstance.findAndCountAll({ limit, offset,
            include: [
                {
                    model: usersModel_1.UserInstance,
                    attributes: ['id', 'DoctorsName', 'Email', 'Specialization', 'Phone'],
                    as: 'user'
                }
            ]
        });
        res.status(200);
        res.status(200);
        res.json({
            msg: "Here are your patients",
            count: record.count,
            record: record.rows
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to read all patients',
            route: '/read'
        });
    }
}
exports.getPatients = getPatients;
async function getOne(req, res, next) {
    try {
        const id = req.params;
        const record = await patients_1.PatientsInstance.findAndCountAll({ where: id });
        res.render('dashboard', { patientDetail: record.rows });
        // res.status(200);
        // res.json({
        //     msg:"Here is your patient",
        //     record
        // })
    }
    catch (error) {
        res.status(500);
        res.json({
            msg: 'failed to read a patient',
            route: '/read/:id'
        });
    }
}
exports.getOne = getOne;
//to get a single patients full info
async function getPatientInfo(req, res, next) {
    const uniqueId = req.params;
    try {
        const record = await patients_1.PatientsInstance.findOne({ where: uniqueId });
        res.render('patient', { uniquePatient: record });
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            msg: 'failed to read a patient',
            route: '/read/unique/:id'
        });
    }
}
exports.getPatientInfo = getPatientInfo;
async function UpdatePatients(req, res, next) {
    try {
        const { id } = req.params;
        const { patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis } = req.body;
        const validateResult = utils_1.updatePatientSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const record = await patients_1.PatientsInstance.findOne({ where: { id } });
        if (!record) {
            res.status(404).json({
                Error: "cannot find patient",
            });
        }
        const updaterecord = await record?.update({
            //id:id,
            patientName: patientName,
            age: age,
            hospitalName: hospitalName,
            weight: weight,
            height: height,
            bloodGroup: bloodGroup,
            genotype: genotype,
            bloodPressure: bloodPressure,
            HIV_status: HIV_status,
            hepatitis: hepatitis
        });
        // res.status(200).json({
        //     message: 'you have successfully updated patients',
        //     record: updaterecord 
        //  })
        res.redirect('/dashboard');
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to update',
            route: '/update/:id'
        });
    }
}
exports.UpdatePatients = UpdatePatients;
async function updatePatientInfo(req, res, next) {
    const uniqueId = req.params;
    try {
        const record = await patients_1.PatientsInstance.findOne({ where: uniqueId });
        res.render('updateinfo', { updatePatientInfo: record });
        //   res.redirect('/dashboard')
    }
    catch (error) {
        console.log(error);
        res.status(500);
        res.json({
            msg: 'failed to update a patient',
            route: '/update/unique/:id'
        });
    }
}
exports.updatePatientInfo = updatePatientInfo;
async function DeletePatients(req, res, next) {
    try {
        const { id } = req.params;
        const record = await patients_1.PatientsInstance.findOne({ where: { id } });
        if (!record) {
            res.status(404).json({
                message: "does not exist"
            });
        }
        const deletedRecord = await record?.destroy();
        res.render('dashboardrefresh');
        //    res.status(200).json({
        //     msg: 'Patient has been deleted successfully',
        //     deletedRecord
        //    })
    }
    catch (error) {
        res.status(500).json({
            msg: 'failed to delete',
            route: '/delete/:id'
        });
    }
}
exports.DeletePatients = DeletePatients;
