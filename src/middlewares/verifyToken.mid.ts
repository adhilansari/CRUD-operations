import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

 const verfyToken = async(req:any,res:Response,next:NextFunction)=>{
    try {
        const token:string = req.headers.token!
        const decodeUser = verify(token,process.env.JWT_SECRET_KEY!)
        req.user = decodeUser;
        next();

    } catch (error) {
        res.status(404).send({ message: "token is not verified", error });
    }
}
export default verfyToken