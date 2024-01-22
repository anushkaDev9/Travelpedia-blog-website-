const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const route=require('./routes/PlaceRoutes');
const userRouter=require('./routes/UserRoutes')
const app=express();
const HttpError=require('./model/error')
const port=5000;
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
  next();
})
app.use('/api/places',route);
app.use('/',userRouter);
app.use((req,res,next)=>{
      next(new HttpError(404,'Could not found this route'))
});
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });
mongoose
.connect('mongodb+srv://nush:nush@cluster0.vwubudl.mongodb.net/Travelpedia?retryWrites=true&w=majority')
.then(app.listen(port,()=>{
    console.log(`server running on ${port }`)
}))
.catch(err=>console.log(err))
    
