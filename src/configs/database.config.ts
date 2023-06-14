import { configDotenv } from 'dotenv';
import  {connect} from 'mongoose';
configDotenv()
export const dbConnect=()=>{
    connect(process.env.MONGO_URL!).then(
        ()=> console.log("connected successfully"),
        (error)=>console.log(error)
    )
}
