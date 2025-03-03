export default class MoviesApiService {
    options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization:
                ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGJiZDExYTRiM2VjNzhhN2ExMjE2NTMyNjYzODM1NyIsIm5iZiI6MTc0MDM4NTI0Ni42NTEsInN1YiI6IjY3YmMyYmRlNTE1YzllNDJhZjBhNmEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tE6UfFVY2L2EYmQkJHqTktxKlTPX3UY04CzDN0v5lEQ',
        },
    };

    _apiBase = 'https://api.themoviedb.org/3';

    async getResource(url) {
        const res = await fetch(this._apiBase + url, this.options);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, 
            received ${res.status}`);
        }

        const body = await res.json();
        return body;
    }

    async getAllMovies(page) {
        const res = await this.getResource(
            `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
        );
        return res.results;
    }

    getPerson(id) {
        return this.getResource(`/people/${id}/`);
    }

    async getAllPlanets() {
        const res = await this.getResource(`/planets/`);
        return res.results;
    }

    getPlanet(id) {
        return this.getResource(`/planets/${id}/`);
    }

    async getAllStarships() {
        const res = await this.getResource(`/starships/`);
        return res.results;
    }

    getStarship(id) {
        return this.getResource(`/starships/${id}/`);
    }
}
