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
        platforms: "",
        released: "",
        rating: "",
        genreId: "",
    });

    //Agrega un estado para controlar si el formulario se envió correctamente:
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(videogame);
        try {
            // Enviar una solicitud POST al backend con los datos del formulario
            await axios.post('http://localhost:3001/videogames', videogame);
            
            // Limpiar el formulario después de enviar los datos
            setVideogame({
                name: "",
                image: "",
                description: "",
                platforms: [],
                released: "",
                rating: "",
                genreId: "",
            });

            // Redirigir al usuario a la página de inicio u otra página
            // (opcional, dependiendo de tu aplicación)
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
        const {name, value} = event.target
        // Si el nombre es 'platforms', convierte la cadena de texto en un array
        const newValue = name === 'platforms' ? value.split(',').map(platform => platform.trim()) : value;

        setVideogame({
            ...videogame,
            [name]: newValue,
        })
    
        validateName({
            ...videogame,
            [name]: value,	
        })

        validateImage({
            ...videogame,
            [name]: value,	
        })

        validateDescription({
            ...videogame,
            [name]: value,	
        })

        validatePlatforms({
            ...videogame,
            [name]: value,	
        })

        validateReleased({
            ...videogame,
            [name]: value,	
        })

        validateRating({
            ...videogame,
            [name]: value,	
        })
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <p>Nombre</p>
                    <input 
                        name="name"
                        onChange={(event) => handleChange(event)}
                        value={videogame.name}
                    />
                    <span>{errorName.name}</span>
                </div>
                <div className={styles.formGroup}>
                    <p>Imagen</p>
                    <input
                        onChange={handleChange} 
                        name='image'
                        value={videogame.image}
                    />
                    <span>{errorImage.image}</span>
                </div>
                <div className={styles.formGroup}>
                    <p>Descripción</p>
                    <input
                        onChange={handleChange} 
                        name='description'
                        value={videogame.description}
                    />
                    <span>{errorDescription.description}</span>
                </div>
                <div className={styles.formGroup}>
                    <p>Plataformas</p>
                    <input
                        onChange={handleChange} 
                        name='platforms'
                        value={videogame.platforms}
                    />
                    <span>{errorPlatforms.platforms}</span>
                </div>
                <div className={styles.formGroup}>
                    <p>Fecha</p>
                    <input
                        onChange={handleChange} 
                        name='released'
                        value={videogame.released}
                    />
                    <span>{errorReleased.released}</span>
                </div>
                <div className={styles.formGroup}>
                    <p>Rating</p>
                    <input
                        onChange={handleChange} 
                        name='rating'
                        value={videogame.rating}
                    />
                    <span>{errorRating.rating}</span>
                </div>
                <div className={styles.formGroup}>
                    <p>Genero</p>
                    <input
                        onChange={handleChange} 
                        name='genreId'
                        value={videogame.genreId}
                    />
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