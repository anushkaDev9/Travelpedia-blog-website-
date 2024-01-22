const express=require('express');
const { check} = require('express-validator');
const router=express.Router();
const userController=require('../controllers/UserController');
router.get('/',userController.getUsers);
router.post('/signup',userController.signUp);
router.post('/login',userController.login);
module.exports=router;