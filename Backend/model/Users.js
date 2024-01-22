const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    userName:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    places:[{type:mongoose.Types.ObjectId,required:true,ref:'Place'}],
    image:{type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
module.exports=mongoose.model('User',userSchema);