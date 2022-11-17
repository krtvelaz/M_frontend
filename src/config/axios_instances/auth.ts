import axios from 'axios';
import ValidateTokenExistence from '../helpers/ValidateTokenExistence';
const BASE_URL = `${import.meta.env.VITE_URI_SERVICE_AUTH}`;
const API_URL = `${BASE_URL}${import.meta.env.VITE_API_SERVICE_AUTH_VERSION}`;

export const http = axios.create({
    baseURL: API_URL,
});

http.interceptors.request.use(async (config: any) => {
    console.log("Config: ", config);
    
    if (
        config.url !== '/auth/login' &&
        config.url !== '/auth/password-recovery' &&
        config.url !== '/auth/verify'
    ) {
        console.log("Entro");
        
        try {
            const token = localStorage.getItem('_tk_');
            await ValidateTokenExistence(config, token);
            return config;
        } catch(error) {
            console.log(error);
        }
    }
    return config;
});
