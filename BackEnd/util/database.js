const mongoose =require('mongoose');

const connectDb=async () => {
    
await mongoose
.connect("mongodb+srv://sahil3m3:manager@cluster0.l9lq9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}



module.exports={
    connectDb
}

