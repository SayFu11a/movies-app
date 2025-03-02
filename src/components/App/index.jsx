import MovieCard from '../Card';

import { useState, useEffect } from 'react';

import './App.css';
import Spinner from '../Spinner';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
    },
};

const App = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
            options
        )
            .then(
                (res) => res.json(),
                (err) => {
                    setIsError(true);
                    setIsLoading(false);
                    console.log(err);
                }
            )
            .then((res) => {
                setMovies(res.results);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
                setIsLoading(false);
                console.log(err);
            });
    }, []);

    return (
        <div className="wrapper-app">
            <div className="space-align-container">
                {isLoading ? (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => {
                        return (
                            <div
                                key={i}
                                className="space-align-block"
                                style={{ width: 450, display: 'flex', justifyContent: 'center' }}
                            >
                                <Spinner />
                            </div>
                        );
                    })
                ) : isError ? (
                    <ErrorAlert errMessage="Something went wrong😕" />
                ) : (
                    movies.map((movie) => {
                        return (
                            <MovieCard
                                key={movie.id}
                                title={movie.title}
                                date={movie.release_date}
                                overview={movie.overview}
                                poster={movie.poster_path}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default App;
