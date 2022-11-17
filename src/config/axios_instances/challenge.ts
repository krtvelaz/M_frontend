import axios from 'axios';
import ValidateTokenExistence from '../helpers/ValidateTokenExistence';

const BASE_URL = `${import.meta.env.VITE_URI_SERVICE_CHALLENGE}`;
const API_URL = `${BASE_URL}${
    import.meta.env.VITE_API_SERVICE_CHALLENGE_VERSION
}`;

export const http = axios.create({
    baseURL: API_URL,
});

http.interceptors.request.use(async (config: any) => {
    try {
        const token = localStorage.getItem('_tk_');
        await ValidateTokenExistence(config, token);
        return config;
    } catch(error) {
        console.log(error);
    }
});