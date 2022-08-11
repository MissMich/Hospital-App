import express, {Request, Response, NextFunction} from 'express';
const router = express.Router();
import {Users, getPatients, getOne, UpdatePatients, DeletePatients} from '../controller/hospController';
import {auth} from '../middleware/auth'

/* GET users listing. */
router.post('/create', auth, Users);
router.get('/read', getPatients);
router.get('/read/:id', getOne); //get one patient
router.patch('/update/:id', auth, UpdatePatients);
router.delete('/delete/:id', auth, DeletePatients);

export default router;