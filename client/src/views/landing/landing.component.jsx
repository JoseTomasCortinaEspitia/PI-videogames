import  styles  from "./landing.module.css"
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';

const Landing = () => {
    return (
        <div>
            <div className={styles.contenedornav}>
                <div className={styles.logo}>
                    <img src="/logo1.png" alt="" />
                </div>
                <nav className={styles.navland}>
                    <ul>
                        <li><ScrollLink to="inicio" smooth={true} duration={500}>Inicio</ScrollLink></li>
                        <li><ScrollLink to="quienes" smooth={true} duration={500}>Quienes Somos</ScrollLink></li>
                        <li><ScrollLink to="servicios" smooth={true} duration={500}>Servicios</ScrollLink></li>
                        <li><ScrollLink to="contacto" smooth={true} duration={500}>Contacto</ScrollLink></li>
                    </ul>
                </nav>
            </div>
            <Element name="inicio">
                <div className={styles.contenedor1}>
                    <div className={styles.texto1}>
                        <h1 className={styles.titulo}>Videogames</h1>
                        <p>Sumérgete en nuevas aventuras y desafíos con VideoGames: ¡tu portal hacia un mundo de diversión sin límites!</p>
                        <RouterLink to="/home">
                            <button className={styles.button1}>¡Encuentra tu Video Juego!</button>
                        </RouterLink>
                    </div>
                    <div>
                        <img src="/videogame-landing.png" alt="" className={styles.imagen1}/>
                    </div>
                </div>
            </Element>
            <Element name="quienes">
                <div className={styles.contenedor2}>
                    <div>
                        <img src="/videogame-landing1.jpg" alt="" className={styles.imagen2}/>
                    </div>
                    <div className={styles.texto2}>
                        <h2>¿Quienes Somos?</h2>
                        <p>En VideoGames, nos dedicamos a conectar a los amantes de los videojuegos 
                            con las experiencias más emocionantes y los últimos lanzamientos. 
                            Nuestra misión es proporcionar un espacio donde la comunidad gamer pueda 
                            encontrar su hogar virtual y crear vínculos duraderos con sus mundos y personajes favoritos.</p>
                        <RouterLink to="/home">
                            <button className={styles.button2}>¡Video Juego a Casa!</button>
                        </RouterLink>
                    </div>
                </div>
            </Element>
            <Element name="servicios">
                <div className={styles.contenedor3}>
                    <div>
                        <h1>Servicios</h1>
                    </div>
                    <div className={styles.imgcontenedor}>
                        <div className={styles.servicio}>
                            <h2>Explora Nuevos Mundos</h2>
                            <img src="/videogame-servicio1.jpg" alt="" className={styles.imagen3}/>
                            <p>Descubre aventuras únicas y emocionantes en nuestros videojuegos. ¡Sumérgete en mundos fantásticos y vive experiencias inolvidables!</p>
                        </div>
                        <div className={styles.servicio}> 
                            <h2>Unete a la Competencia</h2>
                            <img src="/videogame-servicio2.jpg" alt="" className={styles.imagen3}/>
                            <p>Participa en competiciones llenas de adrenalina. ¡Demuestra tu destreza y compite contra jugadores de todo el mundo para ganar grandes premios!</p>
                        </div>
                        <div className={styles.servicio}>
                            <h2>Servicio Personalizado</h2>
                            <img src="/videogame-servicio3.jpg" alt="" className={styles.imagen3}/>
                            <p>Encuentra el juego perfecto para ti. Nuestros expertos te guiarán para que encuentres la experiencia de juego que se adapte a tus preferencias y gustos.</p>
                        </div>
                        
                    </div>
                    <RouterLink to="/home">
                        <button className={styles.button1}>¡Hazlo Tuyo Ahora!</button>
                    </RouterLink>
                </div>
            </Element>
            <Element name="contacto">
                <div className={styles.contenedor4}>
                    <div className={styles.contacto}> 
                        <h1>Contacto</h1>
                    </div>
                    <div>
                        <div className={styles.formcontenedor}>
                            <form className={styles.form} action="">
                                <div className={styles.formpack}>
                                    {/* <label className={styles.label1} htmlFor="name">Nombre: </label> */}
                                    <input className={styles.input} type="text" placeholder="Nombre"/>
                                </div>
                                
                                <div className={styles.formpack}>
                                    {/* <label className={styles.label1} htmlFor="telefono">Telefono: </label> */}
                                    <input className={styles.input} type="tel" placeholder="Telefono"/>
                                </div>
                                <div className={styles.formpack}>
                                    {/* <label className={styles.label1} htmlFor="dirección">Dirección: </label> */}
                                    <input className={styles.input} type="text" placeholder="Dirección"/>
                                </div>
                                <div className={styles.formpack}>
                                    {/* <label className={styles.label1} htmlFor="email">Email: </label> */}
                                    <input className={styles.input} type="email" placeholder="Email"/>
                                </div>
                                <div className={styles.formpack}>
                                    {/* <label className={styles.label1} htmlFor="comentario">Comentarios: </label> */}
                                    <input className={styles.input} type="text" placeholder="Comentarios"/>
                                </div>
                                <button className={styles.btn}>¡Enviar!</button>
                            </form>
                            <div >
                                <img src="/videogame-contacto.png" alt="" className={styles.imagen2}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Element>
        </div>

    )
}

export default Landing