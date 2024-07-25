import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Adjust the URL to your API endpoint
});

export default api;
