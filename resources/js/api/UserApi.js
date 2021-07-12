import axios from 'axios';
import api from 'api/index';

export default {
  login: (credentials) => {
    const sanctumUrl = `${process.env.MIX_APP_URL}/sanctum/csrf-cookie`;
    return axios.get(sanctumUrl).then(response => {
        api.post('login', credentials).then(response => {
          api.get('user');
        });
      }
    );
  },

  logout: () => api.post('logout'),

  getCurrentUser: () => api.get('user/current'),

  register: (data) => api.post('register', data),

  getUsers: () => api.get('user'),

  userUpdateAdmin: (data) => api.post('update', data),
};
