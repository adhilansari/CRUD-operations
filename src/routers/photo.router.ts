import { Response, Request, Router } from "express";
import { IPhoto, photoModel } from "../models/photos.model";

const router = Router();

/** Add Photo */
router.post('/add',
    async (req: Request, res: Response) => {
        try {
            const { name, description, mime_type, media_metadata } = req.body;
            const photo:IPhoto =await new photoModel({
                name,
                description,
                mime_type,
                media_metadata
            }).save();
            
            if (!photo) return res.status(400).json('Unable to add photo')
            res.status(200).json({
                message: 'Success',
                data: photo
            });

        } catch (error) {
            res.status(500).json({ error: error });
            console.log(error);
        }
    }
);

/** Update Photo By Id*/
router.put('/edit/:id',
async(req:Request,res:Response)=>{
    try {
        const updatedPhoto = await photoModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updatedPhoto) return res.status(400).json('Unable to update photo')
        res.status(200).json({
            message: 'Success',
            data: updatedPhoto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

/** Get Photos */
router.get('/',
async(req:Request,res:Response)=>{
    try {
        const Photos =await photoModel.find();
        if(!Photos) return res.status(400).json('Unable to get photos')
        res.status(200).json({
            message: 'Success',
            data: Photos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

/** Delete Photo By Id */
router.delete('/delete/:id',
async(req:Request,res:Response)=>{
    try {
        const deletedPhoto=await photoModel.findByIdAndDelete(req.params.id)
        if(!deletedPhoto) return res.status(400).json('Unable to delete photo')
        res.status(200).json({
            message:'Success',
            data:deletedPhoto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
})


export const photoRouter = router