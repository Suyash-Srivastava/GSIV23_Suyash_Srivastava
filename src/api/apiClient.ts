import axios, { AxiosInstance } from 'axios';
import {api_key} from '../utils/constant'
const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`,
    }
});

export default apiClient;