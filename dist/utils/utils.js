"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.registerSchema = exports.updatePatientSchema = exports.createPatientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createPatientSchema = joi_1.default.object().keys({
    patientName: joi_1.default.string().required(),
    age: joi_1.default.string().required(),
    hospitalName: joi_1.default.string().required(),
    weight: joi_1.default.string().required(),
    height: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string().required(),
    genotype: joi_1.default.string().required(),
    bloodPressure: joi_1.default.string().required(),
    HIV_status: joi_1.default.string().required(),
    hepatitis: joi_1.default.string().required()
});
exports.updatePatientSchema = joi_1.default.object().keys({
    // id:Joi.string().required(),
    patientName: joi_1.default.string().required(),
    age: joi_1.default.string().required(),
    hospitalName: joi_1.default.string().required(),
    weight: joi_1.default.string().required(),
    height: joi_1.default.string().required(),
    bloodGroup: joi_1.default.string().required(),
    genotype: joi_1.default.string().required(),
    bloodPressure: joi_1.default.string().required(),
    HIV_status: joi_1.default.string().required(),
    hepatitis: joi_1.default.string().required()
});
exports.registerSchema = joi_1.default.object().keys({
    DoctorsName: joi_1.default.string().required(),
    Email: joi_1.default.string().trim().lowercase().required(),
    Specialization: joi_1.default.string().required(),
    Gender: joi_1.default.string().required(),
    Phone: joi_1.default.string().length(11).pattern(/^[0-9]+$/).required(),
    Password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    Confirm_password: joi_1.default.ref('Password')
}).with('Password', 'Confirm_password');
exports.loginSchema = joi_1.default.object().keys({
    Email: joi_1.default.string().trim().lowercase().required(),
    Password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});
//generate token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRETS;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
exports.options = {
    aboutEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
