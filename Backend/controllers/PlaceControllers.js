const HttpError=require('../model/error')

const { v4: uuidv4 } = require('uuid');
const Place=require('../model/Places');
const User=require('../model/Users');
const mongoose  = require('mongoose');
const createPlaces=async(req,res,next)=>{
   const{userName,name,location,infor,creater}=req.body;
   console.log(userName);
   let addPlaces
addPlaces=new Place({
        userName,
       name,
       location,
        image:'https://s20426.pcdn.co/wp-content/uploads/2018/03/iStock-638564576-1900x1178.jpg',
       infor,
       creater
   });
   let user;
  try {
    user = await User.findOne({userName:userName});
    console.log(user)
  } catch (err) {
    const error = new HttpError(500,'Creating place failed, please try again');
    return next(error);
  }
  console.log(user);
  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }
  console.log(user);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await addPlaces.save({ session: sess });
    user.places.push(addPlaces);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: addPlaces });
}
const getPlacesById=async(req,res,json)=>{
  const pid =req.params.pid;
  let places;
  try{
   places= await Place.findById(pid);
  }catch(err){
        return next(new HttpError(400,`couldn't find the places with id ${pid}`))
  }
  res.json({'places':places.toObject({getters:true})}).status(200)
}
const getPlacesByUser=async(req,res,next)=>{
 const uid=req.params.uid;
 let places;
 try{
  places= await Place.find({userName:uid})
 }catch(err){
  return next(new HttpError(400,`couldn't find the places with id ${uid}`))
 }
 res.json({'places':places.map(place=>place.toObject({getters:true}))})
  .status(200);
}
const updatePlaces=async(req,res,next)=>{
 const pid=req.params.pid;
 const {name,location,image,infor}=req.body;
 let update
 update=await Place.findById(pid);
 update.name=name;
update.location=location;
update.image=image;
update.infor=infor;
try{
 await update.save();
}catch(err){
  return next(new HttpError(422,"Error:cancel update field due to no datat passed"))
}
 res.json({places:update}).status(200)
}
const deletePlaces=async(req,res,next)=>{
  let deletePlace;
  const pid=req.params.pid;
  try{
deletePlace=await Place.findById(pid).populate('creater');
  }catch(err){
    return next(new HttpError(400,`Error:couldn't find the places with id ${pid}`)) 
  }
  if (!deletePlace){
    return next(new HttpError(404,'cannott delete'));
  }
  try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
   await deletePlace.deleteOne({session:sess});
   deletePlace.creater.places.pull(deletePlace);
   await deletePlace.creater.save({session:sess});
   await sess.commitTransaction();
  }catch(err){
    return next(new HttpError(400,`Error:Deletion failed,try again later}`)) 
  }
  res.json({"Message":"Place deleted successfully"}).status(200)
}
exports.createPlaces=createPlaces;
exports.getPlacesById=getPlacesById;
exports.getPlacesByUser=getPlacesByUser;
exports.updatePlaces=updatePlaces;
exports.deletePlaces=deletePlaces;

    