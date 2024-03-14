const { Router } = require('express');

const videogamesRouter = Router();

// Importar todos los Handlers;
const { getVideogamesHandler, getVideogameByIdHandler, createVideogameHandler } = require('../handlers/videogamesHandlers');

videogamesRouter.get("/", getVideogamesHandler); // El primer argumento es la ruta y el segundo es el Handler

videogamesRouter.get("/:id", getVideogameByIdHandler);

videogamesRouter.post("/", createVideogameHandler);

module.exports = videogamesRouter