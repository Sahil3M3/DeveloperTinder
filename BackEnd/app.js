const express=require('express');
const {connectDb}=require("../BackEnd/util/database")
const app=express();
const cookieParser =require("cookie-parser");

const authRoutes=require("./routes/auth");
const profileRoutes=require("./routes/profile");
const requestRoutes=require("./routes/request")
const userRoutes=require("./routes/user");
app.use(express.json());
app.use(cookieParser());

app.use('/',authRoutes);
app.use("/profile",profileRoutes)
app.use("/request",requestRoutes)
app.use("/user",userRoutes);
connectDb()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Server is listing on 3000");
    });     
    console.log("Database is Connection");
    
}).catch(()=>{
    console.log("Error");
    
})




