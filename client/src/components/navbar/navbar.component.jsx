/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
//importo los estilos
import styles from './navbar.module.css'

const Navbar = (props) => {

    const { handleSearch, handleSubmit } = props

    return (
        <div className={styles.navbar}>
            <form onChange={handleSearch} action="" className={styles.form1}>
                <div className={styles.group}>
                    <input required type="text" className={styles.input} />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                    <label>Tu Videogame</label>
                </div>
                <div className={styles.groupButton}>
                    <button onClick={handleSubmit} className={styles.cssbuttonsIo}>
                        <span>
                            Buscar
                        </span>
                    </button>
                    <button className={styles.cssbuttonsIo}><a href="/form">Crear Videogame</a></button>
                </div>
            </form>
        </div>
    )
}

export default Navbar