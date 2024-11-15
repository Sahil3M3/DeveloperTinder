const express=require('express');
const {connectDb}=require("../BackEnd/util/database")
const app=express();

const authRoutes=require("./routes/auth")

app.use('/',authRoutes);


app.listen(3000,()=>{
    console.log("Server is listing on 3000");
    
});     
connectDb()
.then(()=>{
    console.log("connection done ");
    
}).catch(()=>{
    console.log("Error");
    
})




