import { Request, Response, Router } from "express";
import { IUser, UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verfyToken from "../middlewares/verifyToken.mid";
dotenv.config()

const router:Router = Router();
/** Register User */
router.post('/register',
async(req:Request,res:Response)=>{
    try {
        const {firstName,lastName,email,password,profilePhoto}= req.body
        const encryptedPassword = await bcrypt.hash(password,10);
        const existingUser=await UserModel.findOne({email});
        if(existingUser)return res.status(400).json(`user with mail ${email} already exist , please login`)
        
        const User:IUser= await new UserModel({
            firstName,
            lastName,
            email:email.toLowerCase(),
            password:encryptedPassword,
            profilePhoto
        }).save();

        
    
        if(!User) return res.status(400).json('unable to register user')
        res.status(200).json({
            message:'success',
            data:User
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

/** Login User */
router.post('/login',
async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(!user) return res.status(400).json('Username or password is invalid!');
        // compare password
        if(user&& (await bcrypt.compare(password,user.password))){
            res.status(200).json({
                message:'success',
                data:generateTokenResponse(user)
            })};

    } catch (error) {
        console.log(error);
        res.status(500).json(error) 
    }
});

/** Update User by Id*/
router.put('/update/:id',
async(req:Request,res:Response)=>{
    try {
        let {firstName,lastName,email,password,profilePhoto}= req.body
        if(password){
        const encryptedPassword = await bcrypt.hash(password,10)
        password=encryptedPassword        
        }
        const updatedUser=await UserModel.findByIdAndUpdate(req.params.id,{
            firstName,
            lastName,
            email:email.toLowerCase(),
            password,
            profilePhoto

        },{new:true});
        if(!updatedUser) return res.status(400).json('unable to update User')
        res.status(200).json({
            message:'success',
            data:updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

/** Delete User by Id */
router.delete('/delete/:id',
async(req:Request,res:Response)=>{
    try {
        const deletedUser= await UserModel.findByIdAndDelete(req.params.id)
        if(!deletedUser) return res.status(400).json('unable to delete User');
        res.status(200).json({
            message:'success',
            data:deletedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
});

/** Get All Users */
router.get('/all',
async(req:Request,res:Response)=>{
    const users= await UserModel.find()
   try {
     if(!users) return res.status(400).json('no users found');
     res.status(200).json({
         message:'success',
         data:users
     })
   } catch (error) {
    console.log(error);
    res.status(500).json(error)
    
   }
});

/** Check User Token */
router.get('/token',verfyToken,
async(req:any,res:Response)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error);
        res.status(401|500).json(error)
    }
})



export const userRouter = router

const generateTokenResponse = (user:IUser)=>{
    const token = jwt.sign({
        id:user.id,email:user.email,password:user.password
    },process.env.JWT_SECRET_KEY!,{
        expiresIn:'1m'
    });
    user.token=token;    
    return user
}