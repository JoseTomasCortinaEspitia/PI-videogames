import axios from 'axios'
import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID, CLEAR_DETAIL } from './types'

//Función que hace la peticion con axios al back-end
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

//Función que hace la peticion con axios al back-end
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

//Función que hace la peticion con axios al back-end
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

//Función para desmontar mi componente
export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL
    }
}

