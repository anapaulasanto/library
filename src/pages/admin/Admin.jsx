import { useState } from "react";
import axios from "axios";
import styles from '../../styles/Admin.module.scss';
import NavBar from "../NavBar";
import logo from '../../assets/logo-nav.svg'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import API_URL from "../../../src/config"


const Admin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value});
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { username, password } = formData

        if (!username || !password) {
            setMessage('Necessário preencher todos os campos!');
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/register`, formData)
            alert('Cadastrado com sucesso')
            setFormData({ username: '', password: '' });
            setMessage('');
        } catch (error) {
            setMessage('Erro no cadastro');
            console.error('Erro no cadastro:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = formData

        if (!username || !password) {
            setMessage('Necessário preencher todos os campos.');
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/login`, formData);
            navigate('/admin/registerBooks');
        } catch (error) {
            setMessage('Não encontramos uma conta associada');
            console.error('Erro no login:', error);
            return
        }
    }; 

    return(
        <div className={styles.admin}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <NavBar logo={logo} />
                    <Link className={styles.back_btn} to="/">Voltar</Link>
                </div>
                <button className={styles.btn_user}><FaUser /></button>
            </div>
            <hr />
            <div className={styles.admin_container}>
                <div className={styles.text_side}>
                    <h2>ADMIN</h2>
                    <p>Faça login ou cadastre-se para acessar a área administrativa</p>
                </div>
                <div className={styles.form_side}>
                    <form>
                        <label htmlFor="username">Usuario: </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Senha: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </form>
                    {message && <p>{message}</p>}
                    <div className={styles.btn}>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleSignUp}>Cadastre-se</button>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default Admin