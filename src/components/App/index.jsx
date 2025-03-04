import MovieCard from '../Card';

import { useState, useEffect } from 'react';

import './App.css';
import Spinner from '../Spinner';
import { Alert, Pagination } from 'antd';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import SearchForm from '../SearchForm';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
    },
};

const App = () => {
    const [isSerching, setIsSerching] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

    const URL_FIRST = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPaginationPage}&sort_by=popularity.desc`;
    const mainUrlRest =
        '/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc';

    const generateUrl = (url, page) => {
        const baseUrl = isSerching ? '' : 'https://api.themoviedb.org/3';
        const resUrl = `${baseUrl}${url}&page=${page}`;
        return resUrl;
    };

    const [url, setUrl] = useState(generateUrl(mainUrlRest, currentPaginationPage));

    const [paginationCount, setPaginationCount] = useState(20);

    useEffect(() => {
        const currStateUrl = isSerching ? url : mainUrlRest;

        const newUrl = generateUrl(currStateUrl, currentPaginationPage);
        setUrl(newUrl);
    }, [currentPaginationPage]);

    useEffect(() => {
        setIsLoading(true);
        fetch(url, options)
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

                setPaginationCount(res.total_pages > 500 ? 5000 : res.total_pages * 10);
            })
            .catch((err) => {
                setIsError(true);
                setIsLoading(false);
                console.log(err);
            });
    }, [url]);

    const paginationnHandler = (page) => {
        setCurrentPaginationPage(page);
        console.log('changed');
        console.log(currentPaginationPage);
    };

    const urlHandle = (urlQwery) => {
        setCurrentPaginationPage(1);
        setUrl(urlQwery);
    };

    return (
        <div className="wrapper-app">
            <SearchForm
                urlHandler={urlHandle}
                mainUrl={URL_FIRST}
                pageCount={currentPaginationPage}
                setIsSerching={setIsSerching}
            />

            <div className="space-align-container">
                {isLoading ? (
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
                        return (
                            <div
                                key={i}
                                className="space-align-block"
                                style={{ minWidth: 450, display: 'flex', justifyContent: 'center' }}
                            >
                                <Spinner />
                            </div>
                        );
                    })
                ) : isError ? (
                    <ErrorAlert errMessage="Something went wrong😕" />
                ) : movies.length == 0 ? (
                    <Alert message="not found🧐" description="There was no movie with that name." type="warning" />
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
                <Pagination
                    defaultCurrent={1}
                    current={currentPaginationPage}
                    total={paginationCount}
                    onChange={(page) => paginationnHandler(page)}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default App;
