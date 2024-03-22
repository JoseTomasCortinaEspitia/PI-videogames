//importo los estilos
import styles from './form.module.css';

const Form = () => {
    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Videogame</label>
                    <input type="text" id="email" name="email"/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="textarea">How Can We Help You?</label>
                    <textarea name="textarea" id="textarea" rows="10" cols="50"></textarea>
                </div>
                <button className={styles.formSubmitBtn} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
