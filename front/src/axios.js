import axios from 'axios'
import { ip } from './config'

export async function axiosGet(query, token = '') {
    const res = await axios.get(ip + query, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        withCredentials: true
    })
    return res
}
export async function axiosPost(query, data) {
    const res = await axios.post(ip + query, data, {
        withCredentials: true
    })
    return res
}

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.reposense && error.response.status === 401) {
        window.location = '/admin/logout'
    }
    return error;
});