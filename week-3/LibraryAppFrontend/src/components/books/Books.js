import React, { useEffect, useState } from "react";
import getBooks from "../../services/LibraryService/GetBooks";

const Books = () => {
    const [{ isLoading, books, error }, setState] = useState({
        isLoading: true,
        books: [],
        error: null
    });

    const fetchBooks = async () => {
        setState({
            error: null,
            isLoading: true
        });

        const { data, error } = await getBooks();
        if (error) {
            setState({ error: error, isLoading: false });
        }
        else {
            setState({ books: data, isLoading: false });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchBooks();
        }
        fetchData();
    }, []);

    return (
        <>
            <h2>Available Books</h2>

            <button onClick={fetchBooks}>reload</button>

            <div>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                        books.map((book) => {
                            return (
                                <div key={book.id}>
                                    <p>Title: {book.title}</p>
                                    <p>Genre: {book.genre}</p>
                                    <p>Author: {book.author}</p>
                                    <hr />
                                </div>
                            );
                        })
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default Books;
