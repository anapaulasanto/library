import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/SearchBook.module.scss';
import { Link } from 'react-router-dom';
import API_URL from "../../src/config";

const SearchBooks = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch all books when the component mounts
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${API_URL}/books`);
                setBooks(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${API_URL}/books?q=${searchQuery}`);
            setBooks(Array.isArray(response.data) ? response.data : []);
            console.log(response.data);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const removeBook = async (bookId) => {
        try {
            await axios.delete(`${API_URL}/books/${bookId}`);
            // After deleting, fetch the updated list of books
            const response = await axios.get(`${API_URL}/books`);
            setBooks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            <div className={styles.title}>
                <h2>Livros disponíveis</h2>
            </div>
            <input className={styles.input}
                type="text"
                placeholder="Digite o título do livro"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Procurar</button>
            <ul>
                {Array.isArray(books) && books.map((book) => (
                    <li key={book._id}>
                        <h3>{book.title}</h3>
                        <p>Autor: {book.author}</p>
                        <p>Ano: {book.year}</p>
                        {book.image && <img src={book.image} alt={book.title} />}
                        <br />
                        <Link className={styles.link} to={`/searchBooks/${book._id}`}>Ver</Link>
                        <button onClick={() => removeBook(book._id)} className={styles.link}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBooks;
