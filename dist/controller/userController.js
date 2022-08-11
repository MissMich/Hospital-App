"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const usersModel_1 = require("../model/usersModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const patients_1 = require("../model/patients");
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message
            });
        }
        const duplicateEmail = await usersModel_1.UserInstance.findOne({ where: { Email: req.body.Email } });
        if (duplicateEmail) {
            res.status(409).json({
                msg: 'Email has been used, enter another email'
            });
        }
        const duplicatePhone = await usersModel_1.UserInstance.findOne({ where: { Phone: req.body.Phone } });
        if (duplicatePhone) {
            res.status(409).json({
                msg: 'Phone number has been used'
            });
        }
        const hashPassword = await bcryptjs_1.default.hash(req.body.Password, 8);
        const record = await usersModel_1.UserInstance.create({
            id: id,
            DoctorsName: req.body.DoctorsName,
            Email: req.body.Email,
            Specialization: req.body.Specialization,
            Gender: req.body.Gender,
            Phone: req.body.Phone,
            Password: hashPassword
        });
        res.status(201).json({
            message: "You have successfully created a User.",
            record
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const User = await usersModel_1.UserInstance.findOne({ where: { Email: req.body.Email } });
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.Password, User.Password);
        if (!validUser) {
            res.status(401).json({
                message: "Password do not match"
            });
        }
        if (validUser) {
            res.status(200).json({
                message: "Successfully logged in",
                token,
                User
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.LoginUser = LoginUser;
async function getUsers(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const record = await usersModel_1.UserInstance.findAndCountAll({ where: {}, limit, offset, include: [{
                    model: patients_1.PatientsInstance,
                    as: "patients"
                }] });
        res.status(200);
        res.json({
            msg: 'You have successfully retreived all users',
            count: record
        });
    }
    catch (err) {
        res.status(500).json({
            err
        });
    }
}
exports.getUsers = getUsers;
