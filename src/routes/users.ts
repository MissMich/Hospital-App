import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import {Users, getPatients, getOne, UpdatePatients, DeletePatients, getPatientInfo,updatePatientInfo} from '../controller/hospController';
import {auth} from '../middleware/auth'

/* GET users listing. */
router.post('/create', auth, Users);
router.get('/read', getPatients);
router.get('/read/:id', getOne); //get one patient
router.patch('/update/:id', auth, UpdatePatients);
router.get('/delete/:id', auth, DeletePatients);
//router.post('/logout', logout)


router.post('/update/:id', auth, UpdatePatients);
router.get('/read/unique/:id', auth, getPatientInfo)
router.get('/unique/:id', updatePatientInfo)



export default router;