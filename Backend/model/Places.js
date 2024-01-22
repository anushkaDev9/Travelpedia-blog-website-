const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const placeSchema=new Schema({
   userName:{type:String,required:true,required:true,ref:'User'},
   name:{type:String,required:true},
   location:{type:String,required:true},
   image:{type:String,required:false},
   infor:{type:String,required:true},
   //creater:{type:mongoose.Types.ObjectId,required:true,ref:'User'}
});
module.exports=mongoose.model('Place',placeSchema);

