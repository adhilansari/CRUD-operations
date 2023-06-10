import { Express, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { photoModel } from "../models/photos.model";

const route = Router();

route.post('/add',expressAsyncHandler(
    async(req,res)=>{
        try {
            const {name,description} = req.body;
            const photo:any ={
                name,
                description,
            }
            photoModel.create(photo)
            res.status(200).send(photo)
            
        } catch (error) {
            console.log(error);
            
        }
    }
))

export default route