import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_URI_SERVICE_MEDEINN}`;

const API_URL = `${BASE_URL}/api/v1/`;

export const http = axios.create({
    baseURL: API_URL,
});



