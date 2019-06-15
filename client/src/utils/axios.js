import axios from 'axios';
import Cookies from 'universal-cookie';

class Axios {
  constructor() {
    const cookies = new Cookies();
    this.cookies = cookies;
  }

  init = () => {
    // const cookies = new Cookies();
    const token = this.cookies.get('token');
    if (!this.defaultOptions || this.token !== token) {
      if (token) {
        this.token = token;
        this.defaultOptions = {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        };
      }
    }
  }

  removeDaCookiePlz = () => {
    console.log('removing da cookie');
    this.cookies.remove('token', { path: '/' });
    window.location.reload();
  }

  get = async (url, options = {}) => {
    try {
      this.init();
      const response = await axios.get(url, { ...this.defaultOptions, ...options });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 418) {
        return this.removeDaCookiePlz();
      }
      throw error;
    }
  }

  post = async (url, data, options = {}) => {
    try {
      this.init();
      const response = await axios.post(url, data, { ...this.defaultOptions, ...options });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 418) {
        return this.removeDaCookiePlz();
      }
      throw error;
    }
  }

  put = async (url, data, options = {}) => {
    try {
      this.init();
      const response = await axios.put(url, data, { ...this.defaultOptions, ...options });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 418) {
        return this.removeDaCookiePlz();
      }
      throw error;
    }
  }

  delete = async (url, options = {}) => {
    try {
      this.init();
      const response = await axios.delete(url, { ...this.defaultOptions, ...options });
      return response;
    } catch (error) {
      if (error.response && error.response.status === 418) {
        return this.removeDaCookiePlz();
      }
      throw error;
    }
  }
}

const instance = new Axios();

export default instance;
