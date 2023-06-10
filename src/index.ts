import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './configs/database.config';
import route from './routers/photo.route';
dbConnect()

const app = express()
app.use(express.json);

app.use('http://localhost:5000/api/v1/',route)

const port=5000
const server = app.listen(port,()=>{
    console.log("Website Served on http://localhost:"+port);
});