//importo los estilos
import styles from './navbar.module.css'

const Navbar = () => {

    return (
        <div className={styles.navbar}>
            <form  action="" className={styles.form1}>
                <div className={styles.group}>
                    <input required type="text" className={styles.input} />
                    <span className={styles.highlight}></span>
                    <span className={styles.bar}></span>
                    <label>Tu Videogame</label>
                </div>
                <div>
                    <button  className={styles.cssbuttonsIo}>
                        <span>
                            Buscar
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Navbar