//Importo los estilos
import styles from './card.module.css'

const Card = () => {

    return (
        <div>
            <div className={styles.card}>
                <p className={styles.heading}>Imagen</p>
                <p>Nombre</p>
                <p>Generos</p>
            </div>
        </div>
    )
}

export default Card