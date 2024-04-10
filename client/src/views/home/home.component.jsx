//Importo las librerias o dependencias
import { useState, useEffect } from 'react'; // este hook useEffect me ayuda a controlar el ciclo de vida de mi componente
import { useDispatch, useSelector } from 'react-redux';

//importo las actions
import { getVideogames, getVideogamesByName } from '../../redux/actions/actions'

//importo los componentes
import Navbar from '../../components/navbar/navbar.component'
import Cards from '../../components/cards/cards.component'

//importo los estilos
import styles from './home.module.css'

const Home = () => {

    const dispatch = useDispatch();
    //useSelector me permite acceder al state global de mi store, aca se suscriben los componentes al estado global
    const allVideogames = useSelector((state) => state.allVideogames);//
    
    //Filtrar por nombre con el back-end
    const [search, setSearch] = useState('');

    //estado para filtrar desde el front-end
    const [filteredVideogames, setFilteredVideogames] = useState([]);
    
    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    useEffect(() => {
        setFilteredVideogames(allVideogames);
    }, [allVideogames]);

    function handleSearch(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getVideogamesByName(search));
    }

    const handleFilterByGenre = (genre) => {
        const filtered = allVideogames.filter(game => game.genres.includes(genre));
        setFilteredVideogames(filtered);
    }

    const handleFilterByOrigin = (origin) => {
        const filtered = allVideogames.filter(game => {
            if (origin === 'api') {
                return !game.createdInDb; // Filtrar los videojuegos que no están en la base de datos
            } else if (origin === 'database') {
                return game.createdInDb; // Filtrar los videojuegos que están en la base de datos
            } else {
                return true; // Si no se selecciona ningún origen, mostrar todos los videojuegos
            }
        });
        setFilteredVideogames(filtered);
    }

    const handleSortAlphabetical = (order) => {
        const sorted = [...filteredVideogames].sort((a, b) => {
            if (order === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setFilteredVideogames(sorted);
    }

    const handleSortByRating = (order) => {
        const sorted = [...filteredVideogames].sort((a, b) => {
            if (order === 'asc') {
                return a.rating - b.rating;
            } else {
                return b.rating - a.rating;
            }
        });
        setFilteredVideogames(sorted);
    }

    const handleReset = () => {
        setFilteredVideogames(allVideogames);
    }

    return (
        <div className={styles.contenedorHome}>
            <Navbar handleSearch={handleSearch} handleSubmit={handleSubmit} />
            <div>
                <p>Filtrar por Genero: </p>
                <button onClick={() => handleFilterByGenre('Action')}>Action</button>
                <button onClick={() => handleFilterByGenre('Shooter')}>Shooter</button>
                <button onClick={() => handleFilterByGenre('RPG')}>RPG</button>
                <button onClick={() => handleFilterByGenre('Puzzle')}>Puzzle</button>
                <button onClick={() => handleFilterByGenre('Adventure')}>Adventure</button>
                <button onClick={() => handleFilterByGenre('MMORPG')}>Massively Multiplayer</button>
                <button onClick={() => handleFilterByGenre('Sport')}>Sport</button>
                <button onClick={() => handleFilterByGenre('Racing')}>Racing</button>
                <button onClick={() => handleFilterByGenre('Indie')}>Indie</button>
                <button onClick={() => handleFilterByGenre('Platformer')}>Platformer</button>
                <button onClick={() => handleFilterByGenre('Simulation')}>Simulation</button>
                <button onClick={() => handleFilterByGenre('Arcade')}>Arcade</button>
                <button onClick={() => handleFilterByGenre('Strategy')}>Strategy</button>
                <button onClick={() => handleFilterByGenre('Casual')}>Casual</button>
                <button onClick={() => handleFilterByGenre('Fighting')}>Fighting</button>
            </div>
            <div>
            <p>Filtrar por si viene de: </p>
                <button onClick={() => handleFilterByOrigin('api')}>API</button>
                <button onClick={() => handleFilterByOrigin('database')}>Base de Datos</button>
            </div>
            <div>
            <p>Ordenar por: </p>
                <button onClick={() => handleSortAlphabetical('asc')}>Ordenar A-Z</button>
                <button onClick={() => handleSortAlphabetical('desc')}>Ordenar Z-A</button>
                <button onClick={() => handleSortByRating('asc')}>Ordenar por rating de menor a mayor</button>
                <button onClick={() => handleSortByRating('desc')}>Ordenar por rating de mayor a menor</button>
            </div>
            <button onClick={handleReset}>Limpiar</button>
            <Cards allVideogames={filteredVideogames}/>
        </div>
    )
}

export default Home