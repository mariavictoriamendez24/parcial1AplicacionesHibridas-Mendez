import Dieta from "../models/dietas_model.js";

async function getDietas() {
    let dietas = await Dieta.find();
    return dietas;
}
async function getFirstFiveDietas() {
    let dietas = await Dieta.find().limit(5);
    return dietas;
}

async function getDietaById(id) {
    try {
        const dieta = await Dieta.findById(id);
        if (!dieta) {
            throw new Error("Dieta no encontrada");
        }
        return dieta;
    } catch (error) {
        throw new Error("Error al obtener la dieta por ID: " + error.message);
    }
}


async function getDietasActivas() {
    try {
        const dietas = await Dieta.find({ estado: true });
        return dietas;
    } catch (error) {
        throw error;
    }
}
async function createDietas(body) {
    let dieta = new Dieta({
        titulo: body.titulo,
        descripcion: body.descripcion,
        ingredientes: body.ingredientes,
    })
    return await dieta.save();
}
/*
async function updateDietas( body, titulo) {
        console.log(body)
        console.log(titulo)

        let user = await Dieta.updateOne({"titulo": titulo}, {
        
        $set:{
            titulo: body.titulo,
            descripcion: body.descripcion,
            ingredientes: body.ingredientes, 
        }
    });
    return dieta;
}*/

async function updateDietas(body, titulo) {
    try {
        const dietaActualizada = await Dieta.findOneAndUpdate(
            { titulo: titulo },
            {
                $set: {
                    titulo: body.titulo,
                    descripcion: body.descripcion,
                    ingredientes: body.ingredientes,
                },
            },
            { new: true } // Esto devuelve el objeto actualizado
        );

        if (!dietaActualizada) {
            throw new Error("Dieta no encontrada");
        }

        return dietaActualizada;
    } catch (error) {
        throw new Error("Error al actualizar la dieta: " + error.message);
    }
}


async function searchDietaByTitle(titulo) {
    try {
        const dieta = await Dieta.findOne({ titulo });
        return dieta;
    } catch (error) {
        throw error;
    }
}


async function getDietasSorted(field) {
    try {
        const dietas = await Dieta.find().sort({ [field]: 1 });
        return dietas;
    } catch (error) {
        throw error;
    }
}

async function getDietasPaginated(page, limit) {
    try {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const totalDocuments = await Dieta.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);
        
        const dietas = await Dieta.find().limit(limit).skip(startIndex);
        
        const paginationInfo = {
            currentPage: page,
            totalPages: totalPages,
            totalDocuments: totalDocuments
        };
        
        return { dietas, paginationInfo };
    } catch (error) {
        throw error;
    }
}
export { getDietas, createDietas, updateDietas, getFirstFiveDietas, getDietaById, getDietasActivas, searchDietaByTitle, getDietasSorted, getDietasPaginated};
