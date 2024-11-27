import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44330/api', // URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o token JWT no cabeçalho de todas as requisições
api.interceptors.request.use(
    (config) => {
      // Recupera o token armazenado no localStorage
      const token = localStorage.getItem('jwt');
      if (token) {
        // Adiciona o token ao cabeçalho Authorization
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api;
