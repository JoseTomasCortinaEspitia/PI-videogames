//Requiero las variables de entorno
require('dotenv').config();

//Requiero las librerías o dependencias
const axios = require("axios")
const { Op } = require('sequelize');


//Requiero los modelos
const { Videogame, Genre } = require('../db');

//Requiero las funciones de utils
const { infoAPICleaned, infoByIdAPICleaned } = require('../utils/index');

//console.log(process.env.API_KEY)


const getVideogamesController = async () => {
    
    //obtener los videojuegos de la api
    const responseAPI = (await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)).data
    const responseAPICleaned = infoAPICleaned(responseAPI)
    
    //obtener los videojuegos de la db
    const responseDB = await Videogame.findAll()

    return responseAPICleaned.concat(responseDB)
}

//por query
const getVideogamesByNameController = async (name) => {
    //obtener los videojuegos de la api
    const responseAPI = (await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)).data
    const responseAPICleaned = infoAPICleaned(responseAPI)
    const videogameByNameAPI = responseAPICleaned.filter((videogame) => videogame.name.toLowerCase().includes(name.toLowerCase()))
    
    //obtener los videojuegos de la db
    const videogameByNameDB = await Videogame.findAll({
        where: {
            //name : name
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        limit: 15
    });

    // Combinar los resultados y limitar a los primeros 15
    const combinedResults = videogameByNameAPI.concat(videogameByNameDB).slice(0, 15);

    // Verificar si no se encontraron resultados
    if (combinedResults.length === 0) {
        return "El videojuego que intentas buscar no existe.";
    }

    return combinedResults;
}

//por params
const getVideogamesByIdController = async (id, source) => {
    
    if (source === "db") {

        const videogameById = await Videogame.findByPk(id, {
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        
        return videogameById

    } else {

        videogameById = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)).data;
        const responseByIdAPICleaned = infoByIdAPICleaned(videogameById)
        
        return responseByIdAPICleaned
    }
}

//por body
const createVideogamesController = async (name, 
    description, 
    released, 
    rating, 
    platforms, 
    image, 
    createdInDb, 
    genreId) => {
    
    const newVideogame = await Videogame.create({ name, 
        description, 
        released, 
        rating, 
        platforms, 
        image, 
        createdInDb,  
    });

    //await newVideogame.reload();

    await newVideogame.addGenre(genreId)// agrego el genero, hago la asociacion de los modelos

    return newVideogame
}


module.exports = {
    createVideogamesController,
    getVideogamesByIdController,
    getVideogamesByNameController,
    getVideogamesController
}