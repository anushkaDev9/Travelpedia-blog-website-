const { v4: uuidv4 } = require('uuid');
const HttpError=require('../model/error');
const User=require('../model/Users');

const signUp=async(req,res,next)=>{
  const {userName,name,email,password}=req.body;

  let addUsers;
    let existingUser;
  
    
         try{
          existingUser= await User.findOne({email:email,userName:userName});   
         }catch(err){
           return next(new HttpError("Sign In failed,Try again later",404))
         }
         if(!existingUser){
             addUsers= new User({
               userName,
               name,
               image: 'https://github.com/ar7937/StudentPortal/blob/main/Login1.png?raw=true',
               places: [],
               email,
               password,
             })
            try{
                  await addUsers.save();
            }catch(err){
              console.log(err)
              return next(new HttpError("Username already exits,Please try a differnt username.",401))
            }
         }else{
           return next(new HttpError("Email Id exits already,login instead,",401))
         }
  
   
         res.json({"User added:":addUsers}).status(200)
         //console.log(addUsers.id);
        //res.json({"user added":addUsers.toObject({getters:true})})
    }

const getUsers=async(req,res,next)=>{
  let userList;
    try{
         userList=await User.find();
    }catch(err){
      return next(new HttpError("Error:Try Again later",404))
    }
    res.json({"users":userList.map(user=>user.toObject({getters:true}))}).status(200)
}
const login=async(req,res,next)=>{
  
  const {email,password}=req.body;
  console.log(email)
  console.log(password)
    let existingUser;

    try{
      existingUser= await User.findOne({email:email});
     }catch(err){
         return next (new HttpError("Login failed,Please try again later",404))
     }
     if(existingUser===null){
     return  next (new HttpError("Email address doesnot exsist,please check the email address",404))
     }else{
    if(!existingUser || existingUser.password!==password){
      return next(new HttpError("Password don't match,Try again",401))
    }else{
      res.json({message:"Logged In",users:existingUser.toObject({getters:true})});
    }
    console.log(existingUser.userName)
  }
  
 


}
exports.signUp=signUp;
exports.getUsers=getUsers;
exports.login=login;