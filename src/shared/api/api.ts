import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.tawheed.tj/api',
});

export default api;
