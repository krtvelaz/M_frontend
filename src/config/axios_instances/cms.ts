import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_URI_SERVICE_CMS}`;
const API_URL = `${BASE_URL}${import.meta.env.VITE_API_SERVICE_CMS_VERSION}`;

export const http = axios.create({
    baseURL: API_URL,
});

http.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('_tk_');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
