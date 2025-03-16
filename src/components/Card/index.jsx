import { useEffect, useState } from 'react';

import { setMoviesapiRating } from '../../sevices/moviesapi-rating';

import './Card.css';

import { Card, Space, Typography, Rate } from 'antd';

const { Text } = Typography;

const MovieCard = ({ movieId, title, date, overview, poster, rating, getGenresByIds, genreIds, ratingArr }) => {
    const currRatig = () => {
        if (Array.isArray(ratingArr)) {
            for (const obj of ratingArr) {
                if (obj.id === movieId) {
                    return obj.rating;
                }
            }
        } else {
            return 0;
        }
    };

    const defaultRating = currRatig();

    const [ratingNuber, setRatingNuber] = useState(defaultRating);
    useEffect(() => {
        setRatingNuber(currRatig());
    }, [ratingArr]);

    const cutOverview = () => {
        if (overview.split(' ').length > 30) {
            return overview.split(' ').slice(0, 30).join(' ') + ' ...';
        } else {
            return overview;
        }
    };

    const onChangeHandler = (e) => {
        setRatingNuber(e);
        setMoviesapiRating(movieId, e);
    };

    const getRatingColor = () => {
        switch (true) {
            case rating >= 0 && rating < 3:
                return '#E90000';
            case rating >= 3 && rating < 5:
                return '#E97E00';
            case rating >= 5 && rating < 7:
                return '#E9D100';
            case rating >= 7:
                return '#66E900';

            default:
                return '#1111';
        }
    };

    return (
        <div className="space-align-block">
            <Space align="center">
                <Card>
                    <div className="cart-img">
                        <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="movie img" />
                    </div>
                    <div className="cart-info">
                        <div className="cart-info-header" style={{ position: 'relative' }}>
                            <h2 style={{ maxWidth: '200px' }}>{title}</h2>
                            <span
                                style={{
                                    borderColor: getRatingColor(),
                                    position: 'absolute',
                                    top: 0,
                                    left: '100%',
                                    transform: 'translateX(-100%)',
                                }}
                                className="card-rating"
                            >
                                {Math.round(rating * 10) / 10}
                            </span>
                        </div>
                        <p className="cart-date">{date}</p>
                        <div>
                            {getGenresByIds(genreIds).map((genres) => {
                                return (
                                    <Text key={genres.id} keyboard>
                                        {genres.name}
                                    </Text>
                                );
                            })}
                        </div>
                        <p className="card-overview">{cutOverview()}</p>
                        <Rate
                            onChange={(e) => onChangeHandler(e)}
                            value={Number(ratingNuber)}
                            allowHalf
                            count={10}
                            style={{
                                fontSize: 16,
                                marginBottom: '5px',
                            }}
                        />
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export default MovieCard;
