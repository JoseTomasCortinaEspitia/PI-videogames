import axios from 'axios'
import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID, CLEAR_DETAIL, NOT_GET_VIDEOGAME_BY_NAME } from './types'

//Función que hace la peticion con axios al back-end
//para traer todos los videojuegos
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
//para traer un videojuego por nombre
export const getVideogamesByName = (name) => {
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        //console.log(response.data)
        if (Array.isArray(response.data)) {
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: response.data
            })  
        } else{
            return dispatch({
                type: NOT_GET_VIDEOGAME_BY_NAME,
                payload: response.data
            })
        }
    }
}

//Función que hace la peticion con axios al back-end
//para traer un videojuego por ID
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

