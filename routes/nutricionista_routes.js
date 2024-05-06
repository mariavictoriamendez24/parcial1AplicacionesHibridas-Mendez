import express from "express";

import {getNutricionista, createNutricionista, updateNutricionista, desactivarNutricionista } from "../controllers/nutricionista_controller.js";


const ruta = express.Router();

ruta.get("/", async (req, res) => {
    try {
        const nutricionistas = await getNutricionista();
        res.status(200).json(nutricionistas);
    } catch (error) {
        console.error("Error al obtener las nutricionistas:", error);
        res.status(401).json(error);
    }
})

ruta.post("/", async (req, res) => {
    try {
        const body = req.body;
        const nutricionistaNuevo = await createNutricionista(body);
        res.status(201).json(nutricionistaNuevo); // Cambiado el código de estado a 201 para indicar que se creó un nuevo recurso
    } catch (error) {
        console.error("Error al crear la nutricionista:", error);
        res.status(400).json(error);
    }
})

ruta.put("/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const nutricionistaActualizado = await updateNutricionista(id, body);
        res.status(200).json(nutricionistaActualizado);
    } catch (error) {
        console.error("Error al actualizar nutricionista:", error);
        res.status(400).json(error);
    }
});

ruta.delete("/:id", async (req, res) => {
    try {
        const resultado = await desactivarNutricionista(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al desactivar nutricionista:", error);
        res.status(400).json(error);
    }
});

export default ruta;

