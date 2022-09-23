import express from "express";
// import Std from '../controller/student.js';
import Student  from "../controller/User.js"
import Admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";

const router=express.Router()

router.post('/reg',Student.register)
router.get('/stdt',Student.studentDetails)
router.post('/login',Student.Login)
router.put('/editprofile',[auth,Admin],Student.editprofile)

export default router;