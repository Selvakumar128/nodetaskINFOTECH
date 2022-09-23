import mongoose from "mongoose";
import Joi from "joi";

const Student=mongoose.model('Student',new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true
    },
    password:{
        type:Number,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
}));
function validate(student) {
    const schema = {
      email: Joi.string().required(),
      password: Joi.string().required(),
      
    };
  
    return Joi.validate(student, schema);
  }
export default {Student,validate}
