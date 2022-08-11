import express  from 'express';
const router =express.Router()

router.get('/register',(req, res)=>{
    res.render("register")
})
router.get('/login', (req, res)=>{
    res.render("login")
})
router.get('/', (req, res)=>{
    res.render("index")
})

export default router;