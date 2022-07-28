import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_URI_SERVICE_CHALLENGE}`;
const API_URL = `${BASE_URL}${import.meta.env.VITE_API_SERVICE_CHALLENGE_VERSION}`;

export const http = axios.create({
    baseURL: API_URL,
});



