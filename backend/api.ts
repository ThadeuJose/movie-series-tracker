import axios, { AxiosResponse } from "axios";

const api = axios.create({
    params: {
        api_key: process.env.API_KEY
    }
});

function getAllMovies(): Promise<AxiosResponse<any, any>> {
    return api.get(`https://api.themoviedb.org/3/discover/movie?page=1`);
}


export {getAllMovies};