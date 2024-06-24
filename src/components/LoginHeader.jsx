import NavBar from '../pages/NavBar';
import logo from '../assets/logo-nav.svg';
import { FaUser } from "react-icons/fa";
import styles from '../styles/LoginHeader.module.scss';

const LoginHeader = () => {
    return(
        <div >
            <div className={styles.login_container}>
                <NavBar logo={logo} />
                
            </div>
        </div>
    );
};

export default LoginHeader;