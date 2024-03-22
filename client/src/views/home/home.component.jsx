//Importo las librerias o dependencias
import { useEffect } from 'react'// este hook me ayuda a controlar el ciclo de vida de mi componente
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

//importo las actions
import { getVideogames, getVideogamesByName } from '../../redux/actions/actions'

//importo los componentes
import Navbar from '../../components/navbar/navbar.component'
import Cards from '../../components/cards/cards.component'

//importo los estilos
import styles from './home.module.css'

const Home = () => {

    const dispatch = useDispatch();
    //useSelector me permite acceder al state global de mi store, aca se subcriben los componentes al estado global
    const allVideogames = useSelector((state) => state.allVideogames);//
    
    //Filtrar por nombre con el back-end
    const [search, setSearch] = useState('');

    function handleSearch(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getVideogamesByName(search));
    }
    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    return (
        <div className={styles.contenedorHome}>
            <Navbar handleSearch={handleSearch} handleSubmit={handleSubmit} />
            <Cards allVideogames={allVideogames}/>
        </div>
    )
}

export default Home