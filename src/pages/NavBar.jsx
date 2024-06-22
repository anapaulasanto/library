import { Link } from 'react-router-dom'
import styles from '../styles/NavBar.module.scss'

export default function NavBar({ logo }) {
    return (
        <nav className={styles.nav}>
            <div className={styles.icon_nav}>
                <Link to='/'><img src={logo} alt="" /></Link>
                <p>CULTURE</p>
            </div>
        </nav>
    )
}