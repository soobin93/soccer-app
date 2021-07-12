import axios from 'axios';
import api from 'api';

export default {
  login: async (credentials) => {
    const sanctumUrl = `${process.env.MIX_APP_URL}/sanctum/csrf-cookie`;

    await axios.get(sanctumUrl);

    return api.post('login', credentials)
  },

  logout: () => api.post('logout'),

  getCurrentUser: () => api.get('user/current'),

  register: (data) => api.post('register', data),

  getUsers: () => api.get('user'),

  userUpdateAdmin: (data) => api.post('update', data),
};
