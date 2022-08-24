import Joi from 'joi';
import jwt from 'jsonwebtoken'
export const createPatientSchema = Joi.object().keys({
    patientName:Joi.string().required(),
    age:Joi.string().required(),
    hospitalName:Joi.string().required(),
    weight:Joi.string().required(),
    height:Joi.string().required(),
    bloodGroup:Joi.string().required(),
    genotype:Joi.string().required(),
    bloodPressure:Joi.string().required(),
    HIV_status:Joi.string().required(),
    hepatitis:Joi.string().required()
})
export const updatePatientSchema = Joi.object().keys({
    // id:Joi.string().required(),
    patientName:Joi.string().required(),
    age:Joi.string().required(),
    hospitalName:Joi.string().required(),
    weight:Joi.string().required(),
    height:Joi.string().required(),
    bloodGroup:Joi.string().required(),
    genotype:Joi.string().required(),
    bloodPressure:Joi.string().required(),
    HIV_status:Joi.string().required(),
    hepatitis:Joi.string().required()
})

export const registerSchema = Joi.object().keys({
    DoctorsName : Joi.string().required(),
    Email : Joi.string().trim().lowercase().required(),
    Specialization : Joi.string().required(),
    Gender : Joi.string().required(),
    Phone : Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    Password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    Confirm_password:Joi.ref('Password')
}).with('Password', 'Confirm_password')

export const loginSchema = Joi.object().keys({
    Email:Joi.string().trim().lowercase().required(),
    Password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
})

//generate token
export const generateToken = (user:{[key:string]:unknown}):unknown => {
    const pass = process.env.JWT_SECRETS as string
    return jwt.sign(user, pass, {expiresIn:'7d'})
}

export const options = {
    aboutEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}