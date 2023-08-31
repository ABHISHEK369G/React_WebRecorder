const mongoose = require("mongoose");
const colors = require("colors")

const connectDataBase = async() =>{
    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in MongodB ${error}`.bgRed.white);
    }
}


module.exports = connectDataBase;