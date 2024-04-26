//importo las dependencias o librerias
import StarRatings from "react-star-ratings"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

//importo las actions
import { getVideogameById, clearDetail } from "../../redux/actions/actions"

//importo los estilos
import styles from "./detail.module.css"

const Detail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const videogame = useSelector((state) => state.videogame)

    useEffect(() => {
        dispatch(getVideogameById(id))
        return () => {
            dispatch(clearDetail())
        }
    }, [dispatch, id])

    return (
        <div className={styles.body1}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.content1}>
                        <div>
                            <img className={styles.imagen} src={videogame.image} alt="" />
                        </div>
                        <div>
                            <h2 className={styles.title}>{videogame.name}</h2>
                            <p>{videogame.released}</p>
                            <StarRatings
                                rating={videogame.rating}
                                starRatedColor="#f8e825"
                                numberOfStars={5}
                                starDimension="20px"
                                starSpacing="2px"
                            />
                            <p>Plataformas: {videogame.platforms ? videogame.platforms.join(", ") : ""}</p>
                            <div className={styles.content2}>
                                {typeof videogame.description === 'string' ? (
                                    <p>{videogame.description}</p>
                                ) : null}
                                <p>Genero: {videogame.genres ? videogame.genres.map(genre => genre.name).join(", ") : ""}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button><a href="/home">Volver</a></button>
            </div>
        </div>
    )
}

export default Detail