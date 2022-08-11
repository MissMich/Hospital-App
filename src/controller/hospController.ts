import express,{Request,Response,NextFunction} from "express";
import {PatientsInstance} from '../model/patients';
import {v4 as uuidv4, validate} from "uuid";
import { createPatientSchema, options, updatePatientSchema } from "../utils/utils";
import { UserInstance } from "../model/usersModel";

export async function Users(req:Request | any, res:Response, next:NextFunction) {
    const id = uuidv4()

    try{
        const verified = req.user

        const validateResult = createPatientSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const record = await PatientsInstance.create({
            id,
            ...req.body, 
            userId: verified.id})
        res.status(201);
        res.json({
            message:"You have successfully registered a patient.",
            record
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'failed to create',
            route:'/create'
        })
    }
  }
  export async function getPatients(req:Request, res:Response, next:NextFunction){
    try{
        const limit = req.query.limit as number | undefined
        const offset = req.query.offset as number| undefined
        
        const record = await PatientsInstance.findAndCountAll({limit, offset,
            include:[
                {
                    model:UserInstance,
                    attributes:['id', 'DoctorsName', 'Email', 'Specialization', 'Phone'],
                    as: 'user'
                }
            ]
        })
        res.status(200);
        res.status(200);
        res.json({
            msg:"Here are your patients",
            count:record.count,
            record:record.rows
        })
    }catch(error){
           res.status(500).json({
            msg:'failed to read all patients',
             route: '/read'
           })
    }
  }

  export async function getOne(req:Request, res:Response, next:NextFunction){
    try{
      const { id } = req.params
      const record = await PatientsInstance.findOne({where:{id}})
        res.status(200);
        res.json({
            msg:"Here is your patient",
            record
        })
    }catch(error){
        res.status(500);
        res.json({
            msg:'failed to read a patient',
            route: '/read/:id'
        })
    }
}

export async function UpdatePatients(req:Request, res:Response, next:NextFunction){
    try{
        const { id } = req.params
        const {patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis} = req.body
        const validateResult = updatePatientSchema.validate(req.body,options)
        if(validateResult.error){
            return res.status(400).json({
                Error:validateResult.error.details[0].message
            })
        }
        const record = await PatientsInstance.findOne({where:{id}})
        if(!record){
            res.status(404).json({
                      Error:"cannot find patient",
                })   
        }
        
        const updaterecord = await record?.update({
            //id:id,
            patientName:patientName,
            age:age,
            hospitalName:hospitalName,
            weight:weight,
            height:height,
            bloodGroup:bloodGroup,
            genotype:genotype,
            bloodPressure:bloodPressure,
            HIV_status:HIV_status,
            hepatitis:hepatitis
        })
        res.status(200).json({
            message: 'you have successfully updated patients',
            record: updaterecord 
         })
    }catch(error){
            res.status(500).json({
            msg:'failed to update',
            route: '/update/:id'
        })
    }
}

export async function DeletePatients(req:Request, res:Response, next:NextFunction){
    try{
        const { id } = req.params
        const record = await PatientsInstance.findOne({where:{id}})
        if(!record){
            res.status(404).json({
                message: "does not exist"
            })
        }
       const deletedRecord = await record?.destroy();
       res.status(200).json({
        msg: 'Patient has been deleted successfully',
        deletedRecord
       })
    }catch(error){
            res.status(500).json({
            msg:'failed to delete',
            route: '/delete/:id'
           })
    }
}