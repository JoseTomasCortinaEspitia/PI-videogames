//importo los componentes
import Navbar from '../../components/navbar/navbar.component'
import Cards from '../../components/cards/cards.component'

//importo los estilos
import styles from './home.module.css'

const Home = () => {

    return (
        <div className={styles.contenedorHome}>
            <Navbar />
            <Cards />
        </div>
    )
}

export default Home