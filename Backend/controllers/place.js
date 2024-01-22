const HttpError=require('../model/error')
const {validationResult}=require('express-validator')
const { v4: uuidv4 } = require('uuid');
const Place=require('../model/Places');//contructor
let places=[
    {
        placeId:"user1p1",
        id:"user1",
        name:"17 mile drive",
        place:"Los Angelos,Calforina",
        image:"https://s20426.pcdn.co/wp-content/uploads/2018/03/iStock-638564576-1900x1178.jpg",
        infor:"The scenery-saturated 17-Mile Drive in Pebble Beach is stomach-dropping.Coastal cliffs rising from the sea. White sandy beaches kissing the surf. A sea of sand dunes that disappears into a majestic forest full of whimsical cypress and towering pines. Deer graze carefree, birds soar overhead and marine mammals bark from just offshore Land and sea meet splendidly here, with jutting rocks, hanging fog, shrieking gulls and sometimes backstroking sea otters,” observes The Los Angeles Times.But no description can properly place you on 17-Mile Drive. Here are 17 photos — or 17,000 words — that capture a sliver of the bountiful beauty along 17-Mile Drive",
        
        

    }
    
    ,{
        placeId:"user2p1",
        id:"user2",
        name:"The Golden Ring",
        place:"Vladimir,Russia",
        image:"https://globalgrasshopper.com/wp-content/uploads/2017/01/Russia-1000x563.jpg",
        infor:"The Golden Ring is a series of cities that are considered the foundation of Russia’s formation and culture. For travellers especially interested in Russian history, a trip through some of these wonderful cities is a must-see in Russian A few good ones, to begin with, are Yaroslavl, Vladimir, and Suzdal Many of the sites within these cities are UNESCO protected because of their value not only to Russian history but to world history in general. Many of the structures date back to medieval times and beyond, so visitors to the area can get an experience of what life was like long ago. If you visit any cities in the Golden Ring, be sure to tour a few museums and monasteries as well. ",
        
    },{
        placeId:"user2p2",
        id:"user2",
        name:"Mount Batur",
        place:"Bali,Indonesia",
        image:"https://www.intrepidtravel.com/adventures/wp-content/uploads/2016/04/indonesia_bali_mount-batur.jpg",
        infor:"This sacred active volcano lies in Kintamani District in Bali's central highlands, about an hour's drive from Ubud. The hike, along well-marked trails, is relatively easy and usually takes about two to three hours. Guided treks typically include a picnic breakfast, with eggs cooked by the steam from the active volcano. On a clear day, the views are spectacular, stretching all the way across the Batur caldera; the surrounding mountain range; and beautiful Lake Batur, the island's main source of irrigation water.  Sturdy hiking shoes are essential, and it's advisable to wear layers, as the temperature can be cool before sunrise. ",
    }
]
const getPlacesById=async(req,res,next)=>{
       const pid=req.params.pid;
       let placeId;
       try{
        placeId= await Place.findById(pid);
        console.log(pid)
       }
       catch(err){
        next (new HttpError(400,`couldn't find the places with id ${pid}`))
       }
      // const placesId=places.find(place=>{return place.placeId===pid});
       if(!placeId){
          next (new HttpError(404,`couldn't find the places with id ${pid}`))
        }else{
     res.json({place:placeId.toObject({getters:true})})
        
       }
       
}
const getPlacesByUser= async(req,res,next)=>{
   const uid=req.params.uid;
   let userPlaces;
  try{
    userPlaces= await Place.find({id:uid});
  }catch(err){
    next(new HttpError(400,`couldn't find the palces with id ${uid}`))
  }
   //const userPlaces=places.filter(place=>place.id===uid)
   if(userPlaces.length===0){
    const error=new Error(); 
         next(new HttpError(400,`couldn't find the palces with id ${uid}`));
   }else{
    res.json({places:userPlaces.map(place=>place.toObject({getter:true}))}).status(200)
   
   }
 
}
const createPlace=async (req,res,next)=>{
   const error= validationResult(req);
   if(!error.isEmpty()){
    console.log(error);
     next(new HttpError(422,"Please Check your data"))
   }
    const {user,name,location,infor}=req.body;
    /*const addPlace={
        placeId:uuidv4(),
        id,
        name,
        place,
        image,
        infor,
    }*/
    const addPlace=new Place({
        user,
        name,
        location,
        image:'https://s20426.pcdn.co/wp-content/uploads/2018/03/iStock-638564576-1900x1178.jpg',
        infor,
    })
    try{
       await addPlace.save();
    }catch(err){
       return  next(new HttpError(500,"Creating place failed,please try again"));
    }
    //save mthod will add all dcouments in your database and create unique places
    /*places.push(addPlace)*/
    res.status(200).json({"place added":addPlace})
}
const updatePlaces=async(req,res,next)=>{
    const errors=validationResult(req);
    const uid=req.params.uid;
    const pid=req.params.pid;
    let placeId;
    if(!errors.isEmpty()){
        console.log(errors);
           next(new HttpError(422,"Feild misssing"))
    }else{
try{
    const{name,place,image,infor}=req.body;
    placeId=await Place.find({})
    update.name=name;
    update.place=place;
    update.image=image;
    update.infor=infor;
    places[placeId]=update;
}catch(err){
    next(new HttpError(422,"Feild misssing"))
}
   
    res.status(200).json({message:places[placeId]});
    }
   
}
const deletePlace=(req,res,next)=>{
    const pid=req.params.id;
    places=places.filter(place=>{ return place.placeId===pid});
    res.status(200).json({message:"deleted place."});
}
exports.getPlacesById=getPlacesById;
exports.getPlacesByUser=getPlacesByUser;
exports.createPlace=createPlace;
exports.updatePlaces=updatePlaces;
exports.deletePlace=deletePlace;
const HttpError=require('../model/error')
const {validationResult}=require('express-validator')
const { v4: uuidv4 } = require('uuid');
const Place=require('../model/Places');//contructor
const User=require('../model/')
const createPlace=async (req,res,next)=>{
  
const getPlacesById=async(req,res,next)=>{
    const pid=req.params.pid;
    let placeId;
    try{
     placeId= await Place.findById(pid);
     console.log(pid)
    }
    catch(err){
     next (new HttpError(400,`couldn't find the places with id ${pid}`))
    }
   // const placesId=places.find(place=>{return place.placeId===pid});
    if(!placeId){
       next (new HttpError(404,`couldn't find the places with id ${pid}`))
     }else{
  res.json({place:placeId.toObject({getters:true})})
     
    }
    
}
const getPlacesByUser= async(req,res,next)=>{
    const uid=req.params.uid;
    let userPlaces;
   try{
     userPlaces= await Place.find({user:uid});
   }catch(err){
     next(new HttpError(400,`couldn't find the palces with id ${uid}`))
   }
    if(userPlaces.length===0){
     const error=new Error(); 
          next(new HttpError(400,`couldn't find the palces with id ${uid}`));
    }else{
     res.json({places:userPlaces.map(place=>place.toObject({getter:true}))}).status(200)
    
    }
  
 }
 const updatePlaces=async(req,res,next)=>{
    const errors=validationResult(req);
    const pid=req.params.pid;
    if(!errors.isEmpty()){
        console.log(errors);
           next(new HttpError(422,"Feild misssing"))
    }else{
        const{name,location,image,infor}=req.body;
        let updatePlace;
try{
    updatePlace=await Place.findById(pid)
    updatePlace.name=name;
updatePlace.location=location;
updatePlace.image=image;
updatePlace.infor=infor;
   
}catch(err){
    next(new HttpError(422,"Feild misssing"))
}

try{
    await updatePlace.save();
}catch(err){
    next(new HttpError(422,"Cannot update feild"))
}
    res.status(200).json({message:updatePlace.toObject({getter:true})});
    }
}
const deletePlace=async(req,res,next)=>{
    const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      500,
      'Something went wrong, could not delete place.',
    );
    return next(error);
  }

  try {
   await place.deleteOne();
  } catch (err) {
    const error = new HttpError(
      
      500,
      'Something went wrong.'
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlacesById=getPlacesById;
exports.getPlacesByUser=getPlacesByUser;
exports.updatePlaces=updatePlaces;
exports.deletePlace=deletePlace;
let i=0;
const users=[
    {
        user:'user1',
        name:"anushka",
        image:"https://github.com/ar7937/StudentPortal/blob/main/Login1.png?raw=true",
        places:1,
        email:"anushka12@gmail.com",
        password:"anushka"
    },
    {
       user:'user2',
        name:"viktor",
        image:"https://github.com/ar7937/StudentPortal/blob/main/Login1.png?raw=true",
        places:2,
        email:"viktor12@gmail.com",
        password:"viktor@123"
    },
]
const getUser = async (req, res, next) => {
    let users;
    try {
      users = await User.find({}, '-password');
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
  };

const signUp= async(req,res,next)=>{
    const {name,image,email,password}=req.body;
  i++;
    let addPlaces;
   let existingUser;
        try{
         existingUser= await User.findOne({email:email});
     
        }catch(err){
            next (new HttpError(404,"Email already exits"))
        }
        if(!existingUser){
            addPlaces= new User({
                user:'user'+i,
                 name,
                 image,
                 email,
                 password,
             })
           try{
                 await addPlaces.save();
           }catch(err){
             console.log(err)
             return next (new HttpError(500,"Sign failed"))
           }
        }else{
            next (new HttpError(404,"Email already exits"))
        }
         
        res.json({"user added":addPlaces})
    }
   


const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;

try{
    existingUser= await User.findOne({email:email});

   }catch(err){
       next (new HttpError(404,"Login failed"))
   }
  if(!existingUser && existingUser.password===password){
    return next(new HttpError(401,"Not Authorized "))
  }else{
    res.redirect("/");
  }
}
exports.signUp=signUp;
exports.getUser=getUser;
exports.login=login;