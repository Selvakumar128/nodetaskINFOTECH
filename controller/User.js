// import Student from '../model/student.js'
import Student from '../schema/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds=10;

const studentDetails= async (req, res) => {
    const student = await Student.find().select("-password");
    res.send(student)

}

const editprofile= (req,res)=>{
    let updatename=req.body.updatename
    bcrypt.hash(req.body.updatepassword,saltRounds,async(err,hash)=>{

        let updateStudent=await Student.findByIdAndUpdate({_id:req.user.id},{name:updatename,password:hash})
        if(updateStudent){  
                res.send(updateStudent)
            }
        else{
            res.send("student not found")
        }
    })   
}

const register=async (req,res)=>{
    let email=req.body.email
    let student=await Student.findOne({email:email})
    console.log(req.body);
    if(student){
        res.send({message:"email exists please enter a new mail id"})
    }
    else{
        bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
            let registerStudent=new Student({
                
                name:req.body.name,
                email:email,
                // regno:req.body.regno,
                password:hash
            })
            try {
                let result =await registerStudent.save()
                res.send(result)
                
            } catch (error) {
                console.log(error.message);
            }
        })      
    }    
}

const Login=async(req, res)=>{    
        const email=req.body.email;
        
        const exStudent= await Student.findOne({email:email})
        if(exStudent){
            bcrypt.compare(req.body.password,exStudent.password,(err,result)=>{
                if(result){
                    let data=exStudent.toObject()
                    const token=jwt.sign({id:data._id},"secret")
                    res.header("token",token).send("Login Successfull...!")
                }else{
                    res.send("Access denied please enter a  valid password")
                }
            }) 
        }
        else{
          res.status(400).send('Your mail id not found')
        }      
}

export default {register,Login,studentDetails,editprofile};