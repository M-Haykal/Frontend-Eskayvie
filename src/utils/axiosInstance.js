import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3008',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                window.location.href = '/login';
            }
        }
        if (error.response && error.response.status === 403) {
            window.location.href = '/home';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
