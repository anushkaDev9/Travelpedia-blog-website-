const mongoose=require('mongoose');
const UsersSchema=mongoose.Schema;
const users=new UsersSchema(
    {
        user:{type:String,required:true},
        name:{type:String,required:true},
        image:{type:String,required:false},
        places:[{type:mongoose.Types.ObjectId,required:true,ref:'Place'}],
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
    }
)
module.exports=mongoose.model('User',users)
const mongoose=require('mongoose');
const PlaceSchema=mongoose.Schema;
const places=new PlaceSchema({
   user:{type:mongoose.Types.ObjectId,required:true,ref:'User'},
   name:{type:String,required:true},
   location:{type:String,required:true},
   image:{type:String,required:false},
   infor:{type:String,required:true},
});
module.exports=mongoose.model('Place',places);