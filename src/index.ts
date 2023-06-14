import express, { Application } from 'express'
import { photoRouter } from './routers/photo.router';
import { dbConnect } from './configs/database.config';
import { userRouter } from './routers/user.router';
dbConnect()


const app:Application=express();
app.use(express.json())

// Routes
app.use('/api/v1/photos',photoRouter)
app.use('/api/v1/users',userRouter)

// Serving express app 
const port=5000
 app.listen(port,()=>{
    console.log("Website Served on http://localhost:"+port);
});     

