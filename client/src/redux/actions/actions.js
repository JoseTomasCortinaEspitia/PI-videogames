import axios from 'axios'
import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID } from './types'

//Función que hace la peticion con axios a la base de datos
//para traer todos los perros
export const getVideogames = () => {
    return async function(dispatch){
        const response = await axios.get('http://localhost:3001/videogames')
        return dispatch({
            type: GET_VIDEOGAMES,
            payload: response.data
        })
    }
}

//Función que hace la peticion con axios a la base de datos
//para traer un perro por nombre
export const getVideogamesByName = (name) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type: GET_VIDEOGAMES_BY_NAME,
            payload: response.data
        })
    }
}

//Función que hace la peticion con axios a la base de datos
//para traer un perro por ID
export const getVideogameById = (id) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch({
            type: GET_VIDEOGAME_BY_ID,
            payload: response.data
        })
    }
}