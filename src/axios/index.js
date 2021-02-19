import axios from "axios";
const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'https://register-be.herokuapp.com/api/v1',
});
export default instance;