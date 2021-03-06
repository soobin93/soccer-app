import axios from 'axios';
import api from 'api';

export default {
  login: async (credentials) => {
    const sanctumUrl = `${process.env.MIX_APP_URL}/sanctum/csrf-cookie`;

    await axios.get(sanctumUrl);

    return api.post('login', credentials)
  },

  logout: () => {
    localStorage.removeItem('user');
    return api.post('logout');
  },

  getCurrentUser: () => {
    api.get('user/current').then(function (response) {
      if (response.data.hasOwnProperty('user')) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }).catch(function (error) {
      localStorage.removeItem('user');
      api.post('logout').then(function (response) {
        location.reload();
      });
    })
  },

  getUsers: () => api.get('user'),

  getUser: (id) => api.get(`user/${id}`),

  createUser: (data) => api.post('user', data),

  updateUser: (id, data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    return api.post(`user/${id}`, formData);
  }
};
