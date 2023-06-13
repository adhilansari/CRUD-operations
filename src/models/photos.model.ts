import { Schema,model } from "mongoose"

/**Enum for MIME types */
enum MimeType {
    JPEG=1,
    JPG=2,
    PNG=3
};

/** Interface for Media Metadata */
interface Media_Metadata {
    width:number,
    height:number,
    photo:string
};

/** Interface for Photo Document */
export interface IPhoto {
    name:string,
    description:string,
    mime_type:number,
    media_metadata:Media_Metadata
};

/** Schema for Photo */
const photoSchema:Schema<IPhoto>=new Schema<IPhoto>({
    name:{
        type:String,
        maxlength:20
    },
    description:{
        type:String,
        
    },
    mime_type:{
        type:Number,
        enum:MimeType,
        
    },
    media_metadata:{
        'width':{type:Number},
        'height':{type:Number},
        'photo':{type:String}
    }
});

export const photoModel = model('Photo',photoSchema)