import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://localhost:8000',
    //baseURL: 'https://barbershoppi.herokuapp.com',
    baseURL: process.env.REACT_APP_API_URL
});

export default api;