const express = require("express") 
const cors = require("cors")
const userRoutes=require("./Routes/userRoutes")
const mongoose = require("mongoose")

const app = express();
require("dotenv").config();

app.use(cors(origin="*"));
app.use(express.json());
app.use("/api/auth",userRoutes)
const PORT = process.env.PORT 

mongoose.connect(process.env.DB_URI, {
         useNewUrlParser: true ,
         useUnifiedTopology: true ,
}).then(() => {
    console.log("Database connected"); 
}) .catch((err) => {
    console.log(err.message);
});
const server = app.listen(process.env.PORT,() => {
    console.log(`Server running on port : ${PORT}`)
}) ;