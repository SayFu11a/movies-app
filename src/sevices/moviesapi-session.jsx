export function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function moviesapiGuestSession() {
    if (!getCookie('guest_session')) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
            },
        };

        return fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
            .then((res) => res.json())
            .then((res) => {
                let date = new Date(res.expires_at);
                date = date.toUTCString();
                document.cookie = `guest_session=${JSON.stringify(res.guest_session_id)}; expires=${date}`;

                return getCookie('guest_session');
            })
            .catch((err) => console.error(err));
    } else {
        return Promise.resolve().then(() => getCookie('guest_session'));
    }
}

export default moviesapiGuestSession;
