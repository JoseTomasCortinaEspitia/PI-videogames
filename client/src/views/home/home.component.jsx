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
import loadingImg from '../../assets/loading.gif';

const Home = () => {

    const dispatch = useDispatch();
    //useSelector me permite acceder al state global de mi store, aca se suscriben los componentes al estado global
    const allVideogames = useSelector((state) => state.allVideogames);//
    const error = useSelector((state) => state.error);

    // estado para controlar el loading
    const [loading, setLoading] = useState(true);
    
    //Filtrar por nombre con el back-end
    const [search, setSearch] = useState('');

    //estado para filtrar desde el front-end
    const [filteredVideogames, setFilteredVideogames] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    
    useEffect(() => {
        setLoading(true);// Establecer el estado de carga como verdadero al iniciar la solicitud de datos
        dispatch(getVideogames())
            .then(() => setLoading(false)) // Marcar el estado de carga como falso cuando se reciban los datos
            .catch(() => setLoading(false)); // También en caso de error
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


    //cambio
    const handleFilterByGenre = () => {
        const filteredByGenre = allVideogames.filter(game => game.genres && game.genres.includes(selectedGenre));
        setFilteredVideogames(filteredByGenre);
    };

    const handleFilterByOrigin = () => {
        const filteredByOrigin = allVideogames.filter(game => {
            if (selectedOrigin === 'api') {
                return !game.createdInDb;
            } else if (selectedOrigin === 'database') {
                return game.createdInDb;
            } else {
                return true;
            }
        });
        setFilteredVideogames(filteredByOrigin);
    };

    const handleSort = () => {
        let sorted;
        if (selectedSort === 'ascName') {
            sorted = [...filteredVideogames].sort((a, b) => a.name.localeCompare(b.name));
        } else if (selectedSort === 'descName') {
            sorted = [...filteredVideogames].sort((a, b) => b.name.localeCompare(a.name));
        } else if (selectedSort === 'ascRating') {
            sorted = [...filteredVideogames].sort((a, b) => a.rating - b.rating);
        } else if (selectedSort === 'descRating') {
            sorted = [...filteredVideogames].sort((a, b) => b.rating - a.rating);
        }
        setFilteredVideogames(sorted);
    };


    const handleReset = () => {
        setFilteredVideogames(allVideogames);
    }

    return (
        <div className={styles.contenedorHome}>
            <Navbar handleSearch={handleSearch} handleSubmit={handleSubmit} />

            <div>
                {loading ? ( // Mostrar la imagen de carga si los datos están cargando
                    <img src={loadingImg} alt="Loading..." />
                ) : (
                    <>
                        <div>
                            <div>
                                <p>Seleccionar género</p>
                                <select onChange={(e) => setSelectedGenre(e.target.value)}>
                                    <option value="Action">Action</option>
                                    <option value="Shooter">Shooter</option>
                                    <option value="RPG">RPG</option>
                                    <option value="Puzzle">Puzzle</option>
                                    <option value= "Adventure">Adventure</option>
                                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Racing">Racing</option>
                                    <option value="Indie">Indie</option>
                                    <option value="Platformer">Platformer</option>
                                    <option value="Simulation">Simulation</option>
                                    <option value="Arcade">Arcade</option>
                                    <option value="Strategy">Strategy</option>
                                    <option value="Casual">Casual</option>
                                    <option value="Fighting">Fighting</option>
                                </select>
                                <button onClick={handleFilterByGenre}>Filtrar</button>
                            </div>
                            <div>
                                <p>Seleccionar origen: </p>
                                <select onChange={(e) => setSelectedOrigin(e.target.value)}>  
                                    <option value="api">API</option>
                                    <option value="database">Base de Datos</option>
                                </select>
                                <button onClick={handleFilterByOrigin}>Filtrar</button>
                            </div>
                        
                            <div className={styles.tab}>
                                
                            
                                <div>
                                    <p>Seleccionar tipo de ordenamiento</p>
                                    <select onChange={(e) => setSelectedSort(e.target.value)}>
                                        <option value="ascName">A-Z</option>
                                        <option value="descName">Z-A</option>
                                        <option value="ascRating">Rating de menor a mayor</option>
                                        <option value="descRating">Rating de mayor a menor</option>
                                    </select>
                                    <button onClick={handleSort}>Ordenar</button>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleReset}>Limpiar</button>
                        {error ? <p>{error}</p> : <Cards allVideogames={filteredVideogames}/>}
                    </>
                )}
            </div>
        </div>
    )
}

export default Home