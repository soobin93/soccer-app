import axios from 'axios';
import api from 'api/index';

export default {
  login: () => {
    const sanctumUrl = `${process.env.MIX_APP_URL}/sanctum/csrf-cookie`;

    axios.get(sanctumUrl).then(response => {
      api.post('login');
    });
  }
};
