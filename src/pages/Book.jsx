import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from '../styles/Book.module.scss'


const Book = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${bookId}`);
                setBook(response.data);
            } catch(error) {
                alert('ERRO');
                console.log("Error fetching book: ", error);
            }
        };
        fetchBook();
    }, [bookId])

    if (!book) {
        return <div>Loading...</div>;
    } 

    return (
        <div className={styles.book_container}>
            <div className={styles.book_content}>
                <h3>{book.title}</h3>
                <p>Autor: {book.author}</p>
                <p>Ano: {book.year}</p>
                {book.image && <img src={book.image} alt={book.title} />}
                <span>{book.description}</span>
            </div>
            <Link className={styles.back_btn} to="/searchBooks">Voltar</Link>
    </div>
    )
}

export default Book;