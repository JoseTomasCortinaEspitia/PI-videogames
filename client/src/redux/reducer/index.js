import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID, CLEAR_DETAIL } from '../actions/types'

const initialState = {
    allVideogames: [],//estado original con todos los videojuegos
    videogame: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: action.payload,
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
        case CLEAR_DETAIL:
            return {
                ...state,
                videogame: []
            };
        default:
            return {
                ...state
            }
    }       
}

export default rootReducer