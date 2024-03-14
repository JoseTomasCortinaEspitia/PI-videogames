//Requiero las variables de entorno
require('dotenv').config();

//Requiero las librerías o dependencias
const axios = require("axios")
const { Op } = require('sequelize');


//Requiero los modelos
const { Videogame } = require('../db');

//Requiero las funciones de utils
const { infoAPICleaned } = require('../utils/index');

//console.log(process.env.API_KEY)


const getVideogamesController = async () => {
    const responseAPI = (await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)).data
    const responseAPICleaned = infoAPICleaned(responseAPI)
    console.log(Videogame)
    const responseDB = await Videogame.findAll()
    return responseAPICleaned.concat(responseDB)
}

//por query
const getVideogamesByNameController = async (name) => {
    const responseAPI = (await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)).data
    const responseAPICleaned = infoAPICleaned(responseAPI)
    const videogameByNameAPI = responseAPICleaned.filter((videogame) => videogame.name.toLowerCase().includes(name.toLowerCase()))
    const videogameByNameDB = await Videogame.findAll({
        where: {
            //name : name
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    })
    return videogameByNameAPI.concat(videogameByNameDB)
}

//por params
const getVideogamesByIdController = async (id, source) => {
    let videogameById;
    //console.log(source)
    //console.log(id)
    if (source === "db") {
        videogameById = await Videogame.findByPk(id)
    } else {
        videogameById = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)).data;
          
    }
    return videogameById
}

//por body
const createVideogamesController = async (name, description, released, rating, platforms, image, createdInDb) => {
    const newVideogame = await Videogame.create({ name, description, released, rating, platforms, image, createdInDb })
    // const newVideogame = ("hola"+ name + description + released + rating + platforms + image + createdInDb)
    return newVideogame
    }

module.exports = {
    createVideogamesController,
    getVideogamesByIdController,
    getVideogamesByNameController,
    getVideogamesController
}