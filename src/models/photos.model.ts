import { Schema,model } from "mongoose"

/**Enum for MIME types */
export enum MimeType {
    JPEG=1,
    JPG,
    PNG
};

/** Interface for Media Metadata */
interface Media_Metadata {
    width:number,
    height:number,
    photo:String
};

/** Interface for Photo Document */
export interface IPhoto  {
    name:string,
    description:string,
    mime_type:number,
    media_metadata:Media_Metadata
};

/** Schema for Photo */
const photoSchema:Schema<IPhoto>=new Schema<IPhoto>({
    name:{
        type:String,
        maxlength:20,
        required:true
    },
    description:{
        type:String,
        required:true
        
    },
    mime_type:{
        type:Number,
        enum:MimeType,
        required:true
        
    },
    media_metadata:{
        'width':{type:Number,required:true},
        'height':{type:Number,required:true},
        'photo':{type:String,required:true}
    }
});

export const photoModel = model('Photo',photoSchema)