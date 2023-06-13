import express from 'express'
import { photos } from './routers/photo.route';
import { dbConnect } from './configs/database.config';
dbConnect()


const app=express();
app.use(express.json())


// Routes
app.use('/api/v1/photos',photos)

// Serving express app 
const port=5000
 app.listen(port,()=>{
    console.log("Website Served on http://localhost:"+port);
});     