import { getCookie } from './moviesapi-session';

async function moviesapiGetRating() {
    try {
        const guestSessionKey = await getCookie('guest_session');

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
            },
        };

        const res = await fetch(
            `https://api.themoviedb.org/3/guest_session/${JSON.parse(
                guestSessionKey
            )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
            options
        );

        const data = res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
export default moviesapiGetRating;
