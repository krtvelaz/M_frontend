import { http } from "../../../config/axios_instances";
import { IChallenge } from "../custom_types";


const get_list_challenges = async () => {
    try {
        const URI = '';
        return '';
    } catch (e) {
        return Promise.reject('Error');
    }
};

const create_challenge = async (data: IChallenge) => {
    try {
        const URI = '';
        return ';'
    } catch (e) {
        return Promise.reject('Error');
    }
};

const get_challenge_by_id = async (id: number | string) => {
    try {
        const URI = `pokemon?limit=10&offset=0`;
        const resp = await http.get(URI);              
        return resp.data;
    } catch (e) {
        return Promise.reject('Error');
    }
};

const update_challenge = async (id: number | string, data: IChallenge) => {
    try {
        const URI = '';
        return '';
    } catch (e) {
        return Promise.reject('Error');
    }
};

const delete_challenge = async (id: number | string) => {
    try {
        const URI = ``;
        return ''
    } catch (e) {
        return Promise.reject('Error');
    }
};

const service ={
    get_list_challenges,
    create_challenge,
    get_challenge_by_id,
    update_challenge,
    delete_challenge,

}

export default service;
