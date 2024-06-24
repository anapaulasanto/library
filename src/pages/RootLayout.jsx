import Header from "../components/Header"
import { Outlet } from "react-router-dom";
import styles from '../styles/RootLayout.module.scss';

const RootLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                Ana paula &copy; <span>2024</span>
            </footer> 
        </>
    )
}

export default RootLayout;