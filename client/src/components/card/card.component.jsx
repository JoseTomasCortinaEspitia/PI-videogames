/* eslint-disable react/prop-types */
//importo las dependencias o librerias
import { Link } from "react-router-dom";

//Importo los estilos
import styles from './card.module.css'

const Card = (props) => {
    //console.log(props)
    const {videogame} = props
    return (
        <div>
            <Link to={`/home/${videogame.id}`} className={styles.link}>
                <div className={styles.card}>
                    <p className={styles.heading}>
                        <img src={videogame.image} alt="" className={styles.cardImg}/>
                    </p>
                    <div className={styles.cardText1}>
                        <p>{videogame.name}</p>
                    </div>
                    <div className={styles.genreList}>
                        {videogame.genres.map((genre, index) => (
                            <p key={index}>{genre}</p>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card