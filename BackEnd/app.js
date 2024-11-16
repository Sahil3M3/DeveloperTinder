const express=require('express');
const {connectDb}=require("../BackEnd/util/database")
const app=express();

const authRoutes=require("./routes/auth")
app.use(express.json());

app.use('/',authRoutes);



connectDb()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Server is listing on 3000");
    });     
    console.log("database connection is  done ");
    
}).catch(()=>{
    console.log("Error");
    
})




