import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID } from '../actions/types'

const initialState = {
    allVideogames: [],
    allVideogamesCopy: [],
    videogame: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload,
                allVideogamesCopy: action.payload
            };
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                allVideogames: action.payload
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                videogame: action.payload
            };
        default:
            return {
                ...state
            }
    }       
}

export default rootReducer