import express  from 'express';
const router = express.Router();
import { auth } from '../middleware/auth';
import { getOne, getPatientInfo } from '../controller/hospController'

router.get('/register',(req, res)=>{
    res.render("register")
})
router.get('/login', (req, res)=>{
    res.render("login")
})
router.get('/', (req, res)=>{
    res.render("index")
})


router.get('/regpatients',(req, res)=>{
    res.render("regpatients")
})

router.get('/updateinfo/:id', (req, res) => {
    res.render('updateinfo')
})

router.get('/dashboard', auth, getOne)
router.get('/patient/:id', auth, getPatientInfo)


export default router;