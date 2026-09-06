import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,"Username required"],
    unique:[true,"Username already exist"]
  },
  email:{
    type:String,
    required:[true,"Email required"],
    unique:[true,"Email already exist"]
  },
  password:{
    type:String,
    required:[true,"Password required"],
    minlength:6
  },
  verified:{
    type:Boolean,
    default:false
  }
})

userSchema.pre('save',async function(){
  if(!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.comparePassword = async function (candidatePassword){
  return await bcrypt.compare(candidatePassword,this.password);
}

const userModel = mongoose.model('users',userSchema);
export default userModel