import axios from "axios";

export default axios.create({
  baseURL: process.env.MIX_API_BASE_URL
});
