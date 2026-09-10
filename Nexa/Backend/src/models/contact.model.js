import mongoose from 'mongoose';
const contactSchema = new mongoose.Schema({
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:[true,'Onwer Id required']
  },
  contactUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:[true,'User id required']
  },
  nickname:{
    type:String,
    trim:true
  }
},{
  timestamps:true
})

const contactModel = mongoose.model('contacts',contactSchema);
export default contactModel;