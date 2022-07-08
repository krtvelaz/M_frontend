import axios from 'axios';

const API_URL = `https://pokeapi.co/api/v2/`;

export const http = axios.create({
    baseURL: API_URL,
});



