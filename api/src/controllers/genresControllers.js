//importo las dependencias o librerias
const axios = require('axios')

//Requiero los modelos
const {Genre} = require("../db")

//requiero las funciones utils
const {genresAPICleaned} = require('../utils/index')

const getGenres = async () => {
    // Obtener los géneros de la API
    const infoAPI = (await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)).data.results;
    
    // const responseAPI = async () => {
    //     const genres = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
    //     const genresResults = genres.data.results;
    //     const genresResultsArray = genresResults.map((genre) => (genre.name));
    //     return genresResultsArray;
    // }

    // Limpiar los datos de la API
    const responseAPI = genresAPICleaned(infoAPI);
    
    //console.log(responseAPI);
    // const infoAPI = responseAPI();
    // console.log(infoAPI);
    // infoAPI.forEach(async (genre) => {
    //     if (!await Genre.findOne({where: {name: genre}}))
    //     await Genre.create({name: genre});
    // });

    // Verificar si los géneros ya existen en la base de datos
    const existingGenres = await Genre.findAll({ where: { id: responseAPI.map(genre => genre.id) } });
    
    // Filtrar los géneros que aún no existen en la base de datos
    const newGenres = responseAPI.filter(genre => !existingGenres.some(existingGenre => existingGenre.id === genre.id)); //El método .some() se utiliza para verificar si algún elemento del array existingGenres cumple con cierta condición. En este caso, se está verificando si algún género existente en la base de datos tiene el mismo id que alguno de los géneros obtenidos de la API. Esto es importante para evitar crear duplicados en la base de datos.
    
    // Crear los nuevos registros de género en la base de datos
    if (newGenres.length > 0) {
        await Genre.bulkCreate(newGenres); //El método .bulkCreate() se utiliza para crear múltiples registros en la base de datos de manera eficiente. En este caso, se están creando nuevos registros de género en la base de datos para aquellos géneros que se obtuvieron de la API y que no existían previamente en la base de datos. En lugar de crear registros uno por uno, lo que puede ser costoso en términos de rendimiento, .bulkCreate() permite crear varios registros a la vez, lo que mejora la eficiencia del proceso de creación en la base de datos.
    }
    
    // Obtener todos los géneros de la base de datos y devolverlos
    const responseDB = await Genre.findAll();
    return responseDB;
}


module.exports = { getGenres }