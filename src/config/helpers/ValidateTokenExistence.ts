import { invitado_http } from "../axios_instances";


const ValidateTokenExistence = async (config: any, token: string | null) => {
    const URI = 'banner/list';
    let tokenInvitado: any;

    if (!token) {
        try {
            await invitado_http.get(URI);
        } catch(error: any) {
            tokenInvitado = error?.response?.data?.data?.token;
            if (tokenInvitado) {
                localStorage.setItem('_tk_', error?.response?.data?.data?.token);
                config.headers.Authorization = tokenInvitado;
            }
        }
    } else {
        try {
            await invitado_http.get(URI);
            config.headers.Authorization = token;
        } catch(error: any) {
            if (error.response.data.status === 401) {
                localStorage.removeItem('_tk_');
                try {
                    await invitado_http.get(URI);
                } catch(error: any) {
                    tokenInvitado = error?.response?.data?.data?.token;
                    if (tokenInvitado) {
                        localStorage.setItem('_tk_', error?.response?.data?.data?.token);
                        config.headers.Authorization = tokenInvitado;
                    }
                }
            }
        }
    }
}

export default ValidateTokenExistence;