//importo las dependencias o librerias
const axios = require('axios')

//Requiero los modelos
const {Genre} = require("../db")

//requiero las funciones utils
const {genresAPICleaned} = require('../utils/index')

const getGenres = async () => {
    const infoAPI = (await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)).data.results
    const responseAPI = genresAPICleaned(infoAPI)
    const responseDB = await Genre.findAll()
    

    return [...responseDB, ...responseAPI]
}

module.exports = { getGenres }