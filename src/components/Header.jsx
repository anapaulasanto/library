import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.scss';
import LoginHeader from './LoginHeader';

const Header = () => {
    return (

        <div className={styles.header}>
            <LoginHeader />
            <nav className={styles.nav}>
                <Link className={styles.link_nav} to="/">Inicio</Link>
                <Link className={styles.link_nav} to="/searchBooks">Livros</Link>
                <Link className={styles.admin_btn} to="/admin">Admin</Link>
            </nav>
        </div>
    )
}

export default Header