//Importo las dependencias o librerias
import { useState } from 'react';
import axios from 'axios';

//importo los estilos
import styles from './form.module.css';

const Form = () => {

    //Estado local
    const [videogame, setVideogame] = useState({
        name: "",
        image: "",
        description: "",
        platforms: [],
        released: "",
        rating: "",
        genreId: [],
    });

    //Agrega un estado para controlar si el formulario se envió correctamente:
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(videogame);

        // Validar todos los campos antes de enviar el formulario
        validateName(videogame);
        validateImage(videogame);
        validateDescription(videogame);
        validatePlatforms(videogame);
        validateReleased(videogame);
        validateRating(videogame);

        // Verificar si hay errores en algún campo
        if (
            errorName.name ||
            errorImage.image ||
            errorDescription.description ||
            errorPlatforms.platforms ||
            errorReleased.released ||
            errorRating.rating
        ) {
            console.error('Error al enviar el formulario: Campos incompletos o incorrectos');
            return;
        }

        try {
            await axios.post('http://localhost:3001/videogames', {
                ...videogame,
                genreId: videogame.genreId.map(genre => genresMap[genre]),
            });
            
            setVideogame({
                name: "",
                image: "",
                description: "",
                platforms: [],
                released: "",
                rating: "",
                genreId: [],
            });

            setFormSubmittedSuccessfully(true);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    
    //funciones validadoras

    //validaciones para el nombre
    //Estado de errores para el nombre
    const [errorName, setErrorName] = useState({
        name: "Campo requerido",
    });
    //funcion para validar el nombre
    const validateName = (videogame) => {
        
        if (videogame.name === "") {
            return setErrorName({
                ...errorName,
                name: "El campo no puede estar vacio"
            })
        }
        if (videogame.name.length > 35) {
            return setErrorName({
                ...errorName,
                name: "Debe tener menos de 35 caracteres"
            })
        } else {
            return setErrorName({...errorName, name: ""})
        }
    }


    //validaciones para la imagen
    //Estado de errores para la imagen
    const [errorImage, setErrorImage] = useState({
        image: "Campo requerido",
    });

    //funcion para validar la imagen
    const validateImage = (videogame) => {
        if (videogame.image === "") {
            return setErrorImage({
                ...errorImage,
                image: "El campo no puede estar vacio"
            })
        }
        // $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";
        if (!videogame.image.match(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)){
            return setErrorImage({
                ...errorImage,
                image: "Debe ser una URL valida "
            })
        }    
        else {
            return setErrorImage({...errorImage, image: ""})
        }
    }


    //validaciones para la descripción
    //Estado de errores para la descripción
    const [errorDescription, setErrorDescription] = useState({
        description: "Campo requerido",
    });
    
    //funcion para validar la descripción
    const validateDescription = (videogame) => {
        if (videogame.description === "") {
            setErrorDescription({
                ...errorDescription,
                description: "El campo no puede estar vacio"
            })
            return
        }
        setErrorDescription({...errorDescription, description: ""})
        if (videogame.description.length > 350) {
            setErrorDescription({
                ...errorDescription,
                description: "Debe tener menos de 350 caracteres"
            })
            return
        }
        setErrorDescription({...errorDescription, description: ""})
    }


    //validaciones para la plataforma
    //Estado de errores para la plataforma
    const [errorPlatforms, setErrorPlatforms] = useState({
        platforms: "Campo requerido",
    });

    //funcion para validar la plataforma
    const validatePlatforms = (videogame) => {     
        if (videogame.platforms === "") {
            setErrorPlatforms({
                ...errorPlatforms,
                platforms: "El campo no puede estar vacio"
            })
            return
        }
        setErrorPlatforms({...errorPlatforms, platforms: ""})
        if (videogame.platforms.length > 35) {
            setErrorPlatforms({
                ...errorPlatforms,
                platforms: "Debe tener menos de 35 caracteres"
            })
            return
        }
        setErrorPlatforms({...errorPlatforms, platforms: ""})
    }
    

    //validaciones para la fecha de lanzamiento
    //Estado de errores para la fecha de lanzamiento
    const [errorReleased, setErrorReleased] = useState({
        released: "Campo requerido",
    });

    //funcion para validar la fecha de lanzamiento
    const validateReleased = (videogame) => {
        if (videogame.released === "") {
            return setErrorReleased({
                ...errorReleased,
                released: "El campo no puede estar vacio"
            })
        }
        setErrorReleased({...errorReleased, released: ""})
        if (videogame.released.length > 35) {
            return setErrorReleased({
                ...errorReleased,
                released: "Debe tener menos de 35 caracteres"
            })
        }
        setErrorReleased({...errorReleased, released: ""})
    }

    //validaciones para el rating
    //Estado de errores para el rating
    const [errorRating, setErrorRating] = useState({
        rating: "Campo requerido",
    });
    //funcion para validar el rating
    const validateRating = (videogame) => {
        if (videogame.rating === "") {
            return setErrorRating({
                ...errorRating,
                rating: "El campo no puede estar vacio"
            })
        }

        // Expresión regular para validar el formato del rating
        const ratingRegex = /^([0-5](\.\d{1,2})?)$/;
        if (!ratingRegex.test(videogame.rating)) {
            setErrorRating({
                ...errorRating,
                rating: "El rating debe ser un número entre 0 y 5, incluyendo decimales hasta dos dígitos"
            });
            return false;
        }

        setErrorRating({...errorRating, rating: ""})
        if (videogame.rating.length > 35) {
            return setErrorRating({
                ...errorRating,
                rating: "Debe tener menos de 35 caracteres"
            })  
        }

        setErrorRating({...errorRating, rating: ""})
    }



    const handleChange = (event) => {
        const { name, value } = event.target;
        // Si el nombre es 'platforms' o 'genreId', convierte la cadena de texto en un array
        const newValue = name === 'platforms' || name === 'genreId' ? value.split(',').map(item => item.trim()) : value;
    
        setVideogame({
            ...videogame,
            [name]: newValue,
        });
    
        // Validar el nombre
        validateName({
            ...videogame,
            [name]: value,
        });
    
        // Validar la imagen
        validateImage({
            ...videogame,
            [name]: value,
        });
    
        // Validar la descripción
        validateDescription({
            ...videogame,
            [name]: value,
        });
    
        // Validar las plataformas
        validatePlatforms({
            ...videogame,
            [name]: value,
        });
    
        // Validar la fecha de lanzamiento
        validateReleased({
            ...videogame,
            [name]: value,
        });
    
        // Validar el rating
        validateRating({
            ...videogame,
            [name]: value,
        });
    };

    const handleGenreChange = (event) => {
        const newValue = Array.from(event.target.selectedOptions, option => option.value);
        setVideogame({
            ...videogame,
            genreId: newValue,
        });
    };

    const genresMap = {
        "Racing": 1,
        "Shooter": 2,
        "Adventure": 3,
        "Action": 4,
        "RPG": 5,
        "Fighting": 6,
        "Puzzle": 7,
        "Strategy": 10,
        "Arcade": 11,
        "Simulation": 14,
        "Sports": 15,
        "Card": 17,
        "Family": 19,
        "Board Games": 28,
        "Educational": 34,
        "Casual": 40,
        "Indie": 51,
        "Massively Multiplayer": 59,
        "Platformer": 83,
    };


    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Para el Nombre */}
                <div className={styles.formGroup}>
                    <p>Nombre</p>
                    <input 
                        name="name"
                        onChange={(event) => handleChange(event)}
                        value={videogame.name}
                    />
                    <span>{errorName.name}</span>
                </div>

                {/* Para la Imagen */}
                <div className={styles.formGroup}>
                    <p>Imagen</p>
                    <input
                        onChange={handleChange} 
                        name='image'
                        value={videogame.image}
                    />
                    <span>{errorImage.image}</span>
                </div>

                {/* Para la Descripción */}
                <div className={styles.formGroup}>
                    <p>Descripción</p>
                    <input
                        onChange={handleChange} 
                        name='description'
                        value={videogame.description}
                    />
                    <span>{errorDescription.description}</span>
                </div>
                
                {/* Para las Plataformas */}
                <div className={styles.formGroup}>
                    <p>Plataformas</p>
                    <select
                        onChange={handleChange} 
                        name='platforms'
                        value={videogame.platforms}
                        multiple // Agregar el atributo multiple
                    >
                        <option value="PC">PC</option>
                        <option value="macOS">macOS</option>
                        <option value="Linux">Linux</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo">Nintendo</option>
                    </select>
                    <span>{errorPlatforms.platforms}</span>
                </div>

                {/* Para la Fecha de Lanzamiento */}
                <div className={styles.formGroup}>
                    <p>Fecha</p>
                    <input
                        type='date'
                        onChange={handleChange} 
                        name='released'
                        value={videogame.released}
                    />
                    <span>{errorReleased.released}</span>
                </div>

                {/* Para el Rating */}
                <div className={styles.formGroup}>
                    <p>Rating</p>
                    <input
                        onChange={handleChange} 
                        name='rating'
                        value={videogame.rating}
                    />
                    <span>{errorRating.rating}</span>
                </div>

                {/* Para el Genero */}
                <div className={styles.formGroup}>
                    <p>Genero</p>
                    <select
                        onChange={handleGenreChange} 
                        name='genreId'
                        value={videogame.genreId}
                        multiple // Agregar el atributo multiple
                    >
                        <option value="Racing">Racing</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Action">Action</option>
                        <option value="RPG">RPG</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Sports">Sports</option>
                        <option value="Card">Card</option>
                        <option value="Family">Family</option>
                        <option value="Board Games">Board Games</option>
                        <option value="Educational">Educational</option>
                        <option value="Casual">Casual</option>
                        <option value="Indie">Indie</option>
                        <option value="Massively Multiplayer">Massively Multiplayer</option>
                        <option value="Platformer">Platformer</option>
                    </select>
                    {/* {error.genreId ? (<p>{error.genreId}</p>) : (<p>Genero ingresado correctamente!</p>)} */}
                </div>

                {formSubmittedSuccessfully && (
                    <p>Tu videojuego ha sido creado exitosamente.</p>
                )}
                {errorName.name || 
                errorImage.image || 
                errorDescription.description ||
                errorReleased.released || 
                errorRating.rating ||
                
                errorPlatforms.platforms ? null : <button className={styles.formSubmitBtn} type="submit">Crear!</button>}
                
            </form>
            <button><a href="/Home">Volver</a></button>
        </div>
    );
};

export default Form;