/* eslint-disable react/prop-types */

//importo las librerias o dependencias
import { useState } from 'react';

//importo los componentes(osea card)
import Card from '../card/card.component';

//importo los estilos
import styles from './cards.module.css';

const Cards = ({ allVideogames }) => {

    //para el paginado
    const [currentPage, setCurrentPage] = useState(1); //estado para la pagina actual
    const videoGamesPerPage = 15; //numero de videojuegos por pagina
    const indexOfLastVideoGame = currentPage * videoGamesPerPage; //indice del ultimo videojuego
    const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage; //indice del primer videojuego
    const currentVideogames = allVideogames.slice(indexOfFirstVideoGame, indexOfLastVideoGame); //videojuegos en la pagina actual

    const prevHandler = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextHandler = () => {
        if (indexOfLastVideoGame < allVideogames.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div className={styles.contenedorCards}>
                {currentVideogames.map((videogame) => (
                    <Card key={videogame.id} videogame={videogame} />
                ))}
            </div>
            <div className={styles.paginado}>
                <div>
                    <h1>Página: {currentPage}</h1>
                </div>
                <div className= {styles.wrapperButtons}>
                    <button onClick={prevHandler} disabled={currentPage === 1}>Anterior</button>
                    <button onClick={nextHandler} disabled={indexOfLastVideoGame >= allVideogames.length}>Siguiente</button>
                </div>
            </div>
        </div>
    );
}

export default Cards;