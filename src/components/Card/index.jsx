import { Card, Space, Typography } from 'antd';

import './Card.css';

const { Text } = Typography;

const MovieCard = ({ title, date, overview, poster }) => {
    const cutOverview = () => {
        if (overview.split(' ').length > 37) {
            return overview.split(' ').slice(0, 37).join(' ') + ' ...';
        } else {
            return overview;
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
                        <h2>{title}</h2>
                        <p className="cart-date">{date}</p>
                        <span>
                            <Text keyboard>Action</Text>
                        </span>{' '}
                        <Text keyboard>Drama</Text>
                        <span></span>
                        <p className="card-overview">{cutOverview()}</p>
                    </div>
                </Card>
            </Space>
        </div>
    );
};

export default MovieCard;
