import { Schema,model } from "mongoose"
export interface IPhotos {
    id:string,
    name:string,
    description:string,
}

 const photosSchema = new Schema({
    id:String,
    name:String,
    description:String,
    },

    {
        timestamps:true,
    }
)
export const photoModel = model("photos",photosSchema)