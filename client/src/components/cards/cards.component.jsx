/* eslint-disable react/prop-types */
//importo los componentes
import Card from '../card/card.component'

//importo los estilos
import styles from './cards.module.css'

const Cards = (props) => {

    const {allVideogames} = props;
    return (
        <div className={styles.contenedorCards}>
            {allVideogames?.map((videogame) => <Card key={videogame.id} videogame={videogame}/>) }           
        </div>
    )
}

export default Cards