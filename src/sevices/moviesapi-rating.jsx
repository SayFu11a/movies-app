import { getCookie } from './moviesapi-session';

export async function setMoviesapiRating(movieId, ratingVal) {
    try {
        const guestSessionKey = await getCookie('guest_session');

        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
            },
            body: `{"value":${ratingVal}}`,
        };

        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${JSON.parse(guestSessionKey)}`,
            options
        );

        const data = res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
