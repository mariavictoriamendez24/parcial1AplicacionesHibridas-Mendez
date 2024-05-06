import mongoose from "mongoose";

const nutricionistaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: false
    },

    descripcion: {
        type: String,
        required: false
    },

    especialidad: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        required: false
    },
   
})

export default mongoose.model("nutricionista", nutricionistaSchema);
