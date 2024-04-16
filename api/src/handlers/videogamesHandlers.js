const { createVideogamesController, 
    getVideogamesByIdController, 
    getVideogamesByNameController, 
    getVideogamesController } = require("../controllers/videogamesControllers");

//por query
const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;
    if (name) {
        try {
           const response =  await getVideogamesByNameController(name)
           res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else {
        try {
            const response = await getVideogamesController()
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

//por params
const getVideogameByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    //console.log(source)
    try {
        const response = await getVideogamesByIdController(id, source)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//por body
const createVideogameHandler = async (req, res) => {
    const { name, description, released, rating, platforms, image, createdInDb, genreId } = req.body

    // Verificar si falta algún dato requerido
    if (!name || !description || !released || !rating || !platforms || !image || !createdInDb || !genreId) {
        return res.status(400).json({ error: 'Falta uno o más datos requeridos' });
    }
    
    try {
        //validar si no hay una de las propiedades que retorne un error diciendo que hace falta el dato
        const response = await createVideogamesController(name, description, released, rating, platforms, image, createdInDb, genreId)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getVideogamesHandler,
    getVideogameByIdHandler,
    createVideogameHandler
}