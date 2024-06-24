import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/LoginAdmin.module.scss';
import { Link } from 'react-router-dom';
import NavBar from '../../pages/NavBar';
import logo from '../../assets/logo-nav.svg';
import { FaUser } from "react-icons/fa";

const LoginAdmin = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        image: '',
        description: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, author, year, image, description } = formData;

        if (!title || !author || !year || !image) {
            alert('Preencha todos os campos')
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/books', formData);
            alert('Adicionado com sucesso')
            setFormData({ title: '', author: '', year: '', image: '', description: '' });
        } catch (error) {
            setMessage('Error adding book');
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className={styles.login_admin}>
            <div className={styles.nav}>
                <div className={styles.nav_admin}>
                    <NavBar logo={logo} />
                    <Link className={styles.btn_back} to="/">Voltar</Link>
                </div>
                <button className={styles.btn_user}><FaUser /></button>
            </div>
            <hr />
            <div className={styles.text}>
                <h2>ADMIN</h2>
                <p>Cadastro de livros</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='tit'>Título:</label>
                    <input
                        id='tit'
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='aut'>Autor:</label>
                    <input
                        id='aut'
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='y'>Ano:</label>
                    <input
                        id='y'
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='img'>Imagem URL:</label>
                    <input
                        id='img'
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='desc'>Descrição:</label>
                    <input
                        id='desc'
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Adicionar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginAdmin;
