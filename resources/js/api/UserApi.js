import axios from 'axios';
import api from 'api';
import {useUser} from "components/contexts/UserContext";

export default {
  login: async (credentials) => {
    const sanctumUrl = `${process.env.MIX_APP_URL}/sanctum/csrf-cookie`;

    await axios.get(sanctumUrl);

    return api.post('login', credentials)
  },

  logout: () => {
    const [user, setUser] = useUser();
    localStorage.removeItem('user');
    setUser(null);

    return api.post('logout');
  },

  getCurrentUser: () => api.get('user/current'),

  getUsers: () => api.get('user'),

  getUser: (id) => api.get(`user/${id}`),

  createUser: (data) => api.post('user', data),

  updateUser: (id, data) => api.post(`user/${id}`, data)
};
