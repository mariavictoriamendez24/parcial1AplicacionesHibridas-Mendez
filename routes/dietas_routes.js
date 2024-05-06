import express from "express";
import {  getDietas, createDietas, updateDietas, getFirstFiveDietas, getDietaById, getDietasActivas, searchDietaByTitle, getDietasSorted, getDietasPaginated } from "../controllers/dietas_controller.js";
import verificarToken from "../minddlewares/auth.js";

const ruta = express.Router();

ruta.get("/", verificarToken, async (req, res) => {
    try {
        const dietas = await getDietas();
        res.status(200).json(dietas);
    } catch (error) {
        console.error("Error al obtener las dietas:", error);
        res.status(400).json(error);
    }
})


ruta.get("/primeras-cinco", verificarToken, async (req, res) => {
    try {
        const primerasCincoDietas = await getFirstFiveDietas();
        res.status(200).json(primerasCincoDietas);
    } catch (error) {
        console.error("Error al obtener las primeras cinco dietas:", error);
        res.status(400).json(error);
    }
})



ruta.get("/:id", verificarToken, async (req, res) => { 
    try {
        const id = req.params.id;
        const dieta = await getDietaById(id);
        res.status(200).json(dieta);
    } catch (error) {
        console.error("Error al obtener la dieta por ID:", error);
        res.status(400).json(error);
    }
});



ruta.get("/activas", verificarToken, async (req, res) => {
    try {    
        const dietasActivas = await getDietasActivas();
        res.status(200).json(dietasActivas);
    } catch (error) {
        console.error("Error al obtener las dietas activas:", error);
        res.status(400).json(error);
    }
});

ruta.post("/crear" , async (req, res) => {
    try {
        const body = req.body;
        const nuevaDieta = await createDietas(body);
        res.status(201).json(nuevaDieta); 
    } catch (error) {
        console.error("Error al crear la dieta:", error);
        res.status(400).json(error);
    }
})



ruta.put("/:titulo", async (req, res) => {
    try {
        const body = req.body;
        const titulo = req.params.titulo;
        const dietaActualizada = await updateDietas(body, titulo);
        res.status(200).json(dietaActualizada);
    } catch (error) {
        console.error("Error al actualizar la dieta:", error);
        res.status(400).json(error);
    }
});


ruta.get("/buscar/:titulo", verificarToken, async (req, res) => {
    try {
        const titulo = req.params.titulo;
        const dietaEncontrada = await searchDietaByTitle(titulo);
        if (!dietaEncontrada) {
            return res.status(404).json({ message: "Dieta no encontrada" });
        }
        res.status(200).json(dietaEncontrada);
    } catch (error) {
        console.error("Error al buscar la dieta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


ruta.get("/ordenar/:campo", verificarToken, async (req, res) => {
    try {
        const campo = req.params.campo;
        const dietasOrdenadas = await getDietasSorted(campo);
        res.status(200).json(dietasOrdenadas);
    } catch (error) {
        console.error("Error al obtener las dietas ordenadas:", error);
        res.status(400).json({ error: "Error al obtener las dietas ordenadas" });
    }
});

ruta.get("/paginacion", verificarToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const { dietas, paginationInfo } = await getDietasPaginated(page, limit);
        
        res.status(200).json({ dietas, paginationInfo });
    } catch (error) {
        console.error("Error al obtener las dietas paginadas:", error);
        res.status(400).json({ error: "Error al obtener las dietas paginadas" });
    }
});

export default ruta;
