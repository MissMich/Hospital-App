import express,{Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { UserInstance } from '../model/usersModel'; 
const secrets = process.env.JWT_SECRETS as string;

//checking that a user is verified and can access their unique login details
export async function auth(req:Request | any, res:Response, next:NextFunction){
    try{
        const authorization = req.header.authorization;
    if(!req.cookies.token){
    //   res.status(401).json({
    //     Error: 'Kindly sign up as a user'
    //   }) 
    res.redirect('/login')
      return
    }
    const token = authorization?.slice(7, authorization.length) as string || req.cookies.token

    let verified = jwt.verify(token, secrets);

    if(!verified){
        return res.status(401).json({
            Error:'User not verified, you cant access this route'
        })
    }
   const {id} = verified as {[key:string]:string}
  
   const user = await UserInstance.findOne({where:{id}})

   if(!user){
       return res.status(404).json({
         Error:'User not verified'
       })
   }

req.user = verified  
next()
    } catch(error){
        res.status(403).json({
            Error:'User not logged in'
        })
    }
}