import MovieCard from '../Card';

import { useState, useEffect } from 'react';

import './App.css';

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

    useEffect(() => {
        fetch(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
            options
        )
            .then((res) => res.json())
            .then((res) => setMovies(res.results))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="wrapper-app">
            <div className="space-align-container">
                {console.log(movies)}

                {movies.map((movie) => {
                    return (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            date={movie.release_date}
                            overview={movie.overview}
                            poster={movie.poster_path}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
