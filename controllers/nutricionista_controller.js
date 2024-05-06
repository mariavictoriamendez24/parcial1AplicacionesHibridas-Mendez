import Nutricionista from "../models/nutricionista_model.js"

async function getNutricionista() {
    let nutricionistas  = await Nutricionista.find();
    return nutricionistas;
}


async function createNutricionista(req) {
    if (!req.body || !req.body.titulo || !req.body.descripcion) {
        throw new Error("Los campos 'titulo' y 'descripcion' son obligatorios.");
    }

    let nutricionistaNuevo = new Nutricionista({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        estado: true
    });

    return await nutricionistaNuevo.save();
}
async function updateNutricionista(id, body){
    let nutricionistaActualizado =await Nutricionista.findOneAndUpdate(id,{
        $set:{
            titulo: body.titulo,
            descripcion: body.descripcion,
        }
    })
return nutricionistaActualizado;
}


async function desactivarNutricionista(id){
    let nutricionistaDesactivado = await Nutricionista.findByIdAndUpdate(id,{
        $set: {
            estado:false
        }
    })
    return nutricionistaDesactivado;
}

export {
    getNutricionista, createNutricionista, updateNutricionista, desactivarNutricionista
};