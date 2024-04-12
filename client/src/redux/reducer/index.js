import { GET_VIDEOGAMES, GET_VIDEOGAMES_BY_NAME, GET_VIDEOGAME_BY_ID, CLEAR_DETAIL, NOT_GET_VIDEOGAME_BY_NAME } from '../actions/types'

const initialState = {
    allVideogames: [],//estado original con todos los videojuegos
    videogame: [], //estado con un solo videojuego
    error: "", //estado para cuando no se encuentra videojuego por nombre
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
                allVideogames: action.payload,
                error: ""
            };
        case NOT_GET_VIDEOGAME_BY_NAME:
            return {
                ...state,
                error: action.payload
            }
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