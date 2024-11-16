const express=require('express');
const {connectDb}=require("../BackEnd/util/database")
const app=express();
const cookieParser =require("cookie-parser");

const authRoutes=require("./routes/auth");
const profileRoutes=require("./routes/profile");
app.use(express.json());
app.use(cookieParser());
app.use('/',authRoutes);

app.use("/profile",profileRoutes)

connectDb()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Server is listing on 3000");
    });     
    console.log("database connection is  done ");
    
}).catch(()=>{
    console.log("Error");
    
})




