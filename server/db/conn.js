var mongoose=require("mongoose");


const DB="mongodb+srv://siya105jindal:BoJaLgLLLrjJgvbT@cluster0.ceapzll.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(DB,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));
 