//Requiero las variables de entorno
require('dotenv').config();
const API_KEY = process.env.API_KEY;

//Requiero las librerías o dependencias
const axios = require("axios")
const { Op } = require('sequelize');

//Requiero los modelos
const { Videogame, Genre } = require('../db');

//Requiero las funciones de utils
const { infoAPICleaned, infoByIdAPICleaned } = require('../utils/index');


//Controlador para obtener todos los videojuegos 100 de la API y los de la BD
const getVideogamesController = async () => {
    
    const totalPages = 5; // Número total de páginas a obtener
    const videoGamesPerPage = 20; // Número de videojuegos por página

    //Array para almacenar los videojuegos de todas las páginas
    let responseAPICleaned = [];

    //iterrar sobre cada página
    for (let page = 1; page <= totalPages; page++) {
        const response = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)).data
        const videogames = response.results;
        
        // Limpiar la información de los videojuegos obtenidos
        const cleanedVideogames = videogames.map(videogame => infoAPICleaned(videogame));

        // Agregar los videojuegos limpios de la página actual al array
        responseAPICleaned = responseAPICleaned.concat(cleanedVideogames);

        // Si ya hemos alcanzado el número deseado de videojuegos, salir del bucle
        if (responseAPICleaned.length >= totalPages * videoGamesPerPage) {
            break;
        }
    }
  
    //obtener los videojuegos de la db
    const responseDB = await Videogame.findAll()

    return responseAPICleaned.concat(responseDB)
}





//por query
//controlador para obtener los videojuegos por nombre
const getVideogamesByNameController = async (name) => {
    
    const totalPages = 5; // Número total de páginas a obtener de la API
    const videoGamesPerPage = 20; // Número de videojuegos por página de la API

    //Array para almacenar los videojuegos de todas las páginas
    let responseAPICleaned = [];

    //iterrar sobre cada página
    for (let page = 1; page <= totalPages; page++) {
        const response = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)).data
        const videogames = response.results;
        
        // Limpiar la información de los videojuegos obtenidos
        const cleanedVideogames = videogames.map(videogame => infoAPICleaned(videogame));

        // Agregar los videojuegos limpios de la página actual al array
        responseAPICleaned = responseAPICleaned.concat(cleanedVideogames);

        // Si ya hemos alcanzado el número deseado de videojuegos, salir del bucle
        if (responseAPICleaned.length >= totalPages * videoGamesPerPage) {
            break;
        }
    }

    //filtra los videojuegos para encontrar el que coincida con el nombre recibido por query
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




//controlador para obtener los videojuegos por id y mostrar sus detalles
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




//controlador para crear un nuevo videojuego
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