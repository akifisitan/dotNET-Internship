import React, { useEffect, useState } from "react";
import getAuthors from "../../services/LibraryService/GetAuthors";

const Books = () => {
    const [{ isLoading, authors, error }, setState] = useState({
        isLoading: true,
        authors: [],
        error: null
    });

    const fetchAuthors = async () => {
        setState({
            error: null,
            isLoading: true
        });

        const { data, error } = await getAuthors();
        if (error) {
            setState({ error: error, isLoading: false });
        }
        else {
            setState({ authors: data, isLoading: false });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchAuthors();
        }
        fetchData();
    }, []);

    return (
        <>
            <h2>Authors</h2>

            <button onClick={fetchAuthors}>reload</button>

            <div>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                        authors.map((author) => {
                            return (
                                <div key={author.id}>
                                    <p>Id: {author.id}</p>
                                    <p>Name: {author.name}</p>
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
