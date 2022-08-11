import express,{Request,Response,NextFunction} from "express";
import {v4 as uuidv4, validate} from "uuid";
import { registerSchema, options, loginSchema, generateToken } from "../utils/utils";
import { UserInstance } from "../model/usersModel";
import bcrypt from 'bcryptjs'
import { PatientsInstance } from "../model/patients";

export async function RegisterUser(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()

    try{
        const validateResult = registerSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const duplicateEmail = await UserInstance.findOne({where:{Email:req.body.Email}})
        if(duplicateEmail) {
            res.status(409).json({
                msg:'Email has been used, enter another email'
            })
        }
        const duplicatePhone = await UserInstance.findOne({where:{Phone:req.body.Phone}})
        if(duplicatePhone) {
            res.status(409).json({
                msg:'Phone number has been used'
            })
        }
     
        const hashPassword = await bcrypt.hash(req.body.Password,8)
        const record = await UserInstance.create({
            id:id,
            DoctorsName:req.body.DoctorsName,
            Email:req.body.Email,
            Specialization:req.body.Specialization,
            Gender:req.body.Gender,
            Phone:req.body.Phone,
            Password: hashPassword
        })

        res.status(201).json({
            message:"You have successfully created a User.",
            record
        })
       
    }catch(err){
        res.status(500).json({
            message:'failed to register',
            route:'/register'
        })
    }
  }

  export async function LoginUser(req:Request, res:Response, next:NextFunction) {
    const id = uuidv4()
    try{ 
        const validationResult = loginSchema.validate(req.body,options)
        if( validationResult.error){
           return res.status(400).json({
              Error:validationResult.error.details[0].message
           })
        }
        const User = await UserInstance.findOne({where:{Email:req.body.Email}}) as unknown as {[key:string]:string}
         
        const {id} = User
        const token = generateToken({id})
       const validUser = await bcrypt.compare(req.body.Password, User.Password);
 
       if(!validUser){
          res.status(401).json({
             message:"Password do not match"
         })
       }
       if(validUser){
          res.status(200).json({
              message:"Successfully logged in",
              token,
              User
          })
       }
 
 }catch(err){
    res.status(500).json({
    msg:'failed to login',
    route:'/login'
    })
 }
 }

 export async function getUsers (req:Request, res:Response, next:NextFunction) {
    try {
        const limit = req.query.limit as number | undefined
        const offset = req.query.offset as number |undefined

        const record = await UserInstance.findAndCountAll({where:{}, limit, offset, include:[{
            model:PatientsInstance,
            as:"patients"
        }]})
        res.status(200);
        res.json({
            msg:'You have successfully retreived all users',
            count:record
        })
    } catch(err) {
        res.status(500).json({
            err
        })
    }
 }
 