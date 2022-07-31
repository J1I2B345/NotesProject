
import {connect} from 'mongoose'


export const connectDB = async () => {
    
    try{
        await connect(`${process.env.MONGODB_URI}`)
    }
    catch(e){
        console.log(e)
    }
}
