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
                        {/* Verificamos si videogame.genres o videogame.genre están definidos */}
                        {(videogame.genres || videogame.genre) && (
                            <>
                                {/* Utilizamos map si videogame.genres existe (datos de la API) */}
                                {videogame.genres && videogame.genres.map((genre, index) => (
                                    <p key={index}>{genre}</p>
                                ))}
                                {/* Utilizamos map si videogame.genre existe (datos de la base de datos) */}
                                {videogame.genre && videogame.genre.map((genre, index) => (
                                    <p key={index}>{genre.name}</p>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card