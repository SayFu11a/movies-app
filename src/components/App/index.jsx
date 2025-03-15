import { useState, useEffect, useCallback } from 'react';

import './App.css';

import Sceleton from '../Sceleton';
import { Alert, Pagination, Tabs } from 'antd';

import ErrorAlert from '../ErrorAlert/ErrorAlert';
import SearchForm from '../SearchForm';
import MovieCard from '../Card';

import moviesapiGuestSession from '../../sevices/moviesapi-session';
import moviesapiGenre from '../../sevices/moviesapi-genre';
import { setMoviesapiRating } from '../../sevices/moviesapi-rating';
import moviesapiGetRating from '../../sevices/moviesapi-get-rating';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
    },
};

const App = () => {
    const [totalRatedPages, setTotalRatedPages] = useState(1);

    const [currTab, setCurrTab] = useState(1);

    const [ratingResults, setRatingResults] = useState({});

    const [genresList, setGenresList] = useState({});

    const [isSerching, setIsSerching] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState(''); // Новое состояние для хранения запроса

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
        moviesapiGenre().then((res) => {
            setGenresList(res);
        });
    }, [url]);

    useEffect(() => {
        const currStateUrl = isSerching ? url : mainUrlRest;
        const newUrl = generateUrl(currStateUrl, currentPaginationPage);
        setUrl(newUrl);
    }, [currentPaginationPage]);

    useEffect(() => {
        moviesapiGetRating().then((res) => {
            // console.log(res.results, 'res.results');

            setRatingResults(res.results);
            setTotalRatedPages(res.total_pages);
            console.log(res);
            console.log(res.total_pages, 'total_pages');
        });

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

                if (currTab === 1) {
                    setPaginationCount(res.total_pages > 500 ? 5000 : res.total_pages * 10);
                }
                if (currTab === 2) {
                    setPaginationCount(totalRatedPages > 500 ? 5000 : totalRatedPages * 10);
                }
            })
            .catch((err) => {
                setIsError(true);
                setIsLoading(false);
                console.log(err);
            });
    }, [url, currTab]);

    const paginationnHandler = (page) => {
        setCurrentPaginationPage(page);
        console.log('changed');
        console.log(currentPaginationPage);
    };

    const onChangeRating = (curId, setState) => {
        if (Array.isArray(ratingResults)) {
            ratingResults.map((obj) => {
                if (obj.id === curId) {
                    // console.log('yes', obj.rating);
                    setState(obj.rating);
                    return obj.rating;
                }
            });
        }
    };

    const urlHandle = useCallback((urlQuery) => {
        setCurrentPaginationPage(1);
        setUrl(urlQuery);
    }, []);

    const onChangeTabs = (key) => {
        console.log(key, 'keykeykeykeykeykeykey');
        setCurrTab(+key);
    };

    const getGenres = (idsArr) => {
        let allGenres = [];
        idsArr.map((id) => {
            const filtredGenres = genresList.genres.filter((genre) => {
                return genre.id == id;
            });
            allGenres.push(...filtredGenres);
        });

        return allGenres;
    };

    const RenderApp = ({ moviesArr = [] }) => {
        // console.log(moviesArr, 'moviesArrmoviesArr');
        // setMoviesapiRating(950396, '8.5').then((res) => console.log(res));

        return (
            <>
                <div className="space-align-container">
                    {console.log(totalRatedPages, '=====')}
                    {isLoading ? (
                        [...'амбаюднаскибидидапда'].map((e, i) => {
                            return <Sceleton key={i} />;
                        })
                    ) : isError ? (
                        <ErrorAlert errMessage="Something went wrong😕" />
                    ) : moviesArr.length == 0 ? (
                        <Alert message="not found🧐" description="There was no movie with that name." type="warning" />
                    ) : (
                        moviesArr.map((movie) => {
                            return (
                                <MovieCard
                                    key={movie.id}
                                    movieId={movie.id}
                                    isLoading={isLoading}
                                    title={movie.title}
                                    date={movie.release_date}
                                    overview={movie.overview}
                                    poster={movie.poster_path}
                                    genreIds={movie.genre_ids}
                                    getGenresByIds={getGenres}
                                    rating={movie.vote_average}
                                    ratingArr={ratingResults}
                                    onChangeRating={onChangeRating}
                                />
                            );
                        })
                    )}
                </div>
            </>
        );
    };

    moviesapiGuestSession().then((res) => {
        console.log(res);
    });

    const tabItems = [
        {
            key: '1',
            label: 'Search',
            children: (
                <>
                    <SearchForm
                        urlHandler={urlHandle}
                        mainUrl={URL_FIRST}
                        pageCount={currentPaginationPage}
                        setIsSerching={setIsSerching}
                        searchQuery={searchQuery} // Передаем значение
                        setSearchQuery={setSearchQuery} // Передаем функцию обновления
                    />
                    <RenderApp moviesArr={movies} />
                </>
            ),
        },
        {
            key: '2',
            label: 'Rated',
            children: <RenderApp moviesArr={ratingResults} />,
        },
    ];

    return (
        <div className="wrapper-app">
            <Tabs destroyInactiveTabPane defaultActiveKey="1" items={tabItems} onChange={onChangeTabs} centered />

            <Pagination
                defaultCurrent={1}
                current={currentPaginationPage}
                total={paginationCount}
                onChange={(page) => paginationnHandler(page)}
                showSizeChanger={false}
            />
        </div>
    );
};

export default App;
