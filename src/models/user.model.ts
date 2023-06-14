import { Schema,model } from "mongoose";

export interface IUser {
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    profilePhoto:string,
    token?:string
    }

export const UserSchema:Schema = new Schema<IUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        required:true
    },
    token:{type:String}
},
{
    timestamps:true,
})


export const UserModel = model<IUser>('User',UserSchema)