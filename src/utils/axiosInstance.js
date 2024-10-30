import axios from "axios";

// Axios Interceptor Instance
const baseURL = process.env.BASE_URL ? process.env.BASE_URL : "http://localhost:3000/api/v1"
const AxiosInstance = axios.create({
    baseURL
});

module.exports = AxiosInstance;


