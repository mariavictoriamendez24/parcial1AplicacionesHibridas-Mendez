import mongoose  from "mongoose";


const dietasSchema = new mongoose.Schema({

    titulo:{
        type: String,
        required:true
    },

    descripcion:{
        type: String,
        required:true
    },

    ingredientes:{
        type: String,
        required:true
    },
    beneficios:{
        type: String,
        required:false
    },
})

export default mongoose.model("dietas", dietasSchema)