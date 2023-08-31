const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv")
const connectDataBase = require("./config/db")
const authRoute = require("./routes/authRoute")
const cors = require("cors");
//configuring the dotenv variables
dotenv.config();

//connecting the database
connectDataBase();

//creating the express application
const app=express();


// using middleware for parsing the json data from body
app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    res.send(
      '<h1>welcome to ecommerce app</h1>'
    );
  });

//Auth Route
  app.use("/api/v1/auth",authRoute);
  
  const PORT = process.env.PORT || 8080;

  app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgGreen.white)
  })