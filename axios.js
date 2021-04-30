import axios from 'axios';

const instance = () => {
    const { REACT_APP_OMDB_API_KEY } = process.env;
    axios.defaults.baseURL = `http://www.omdbapi.com/`;
    axios.defaults.params = {};
    axios.defaults.params['apikey'] = REACT_APP_OMDB_API_KEY;

    if (false) {
        axios.interceptors.request.use(
            (request) => {
                console.log(request);
                // Edit request config
                return request;
            },
            (error) => {
                console.log(error);
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                console.log(response);
                // Edit request config
                return response;
            },
            (error) => {
                console.log(error);
                console.log(error.response);
                return Promise.reject(error);
            }
        );
    }
};

export default instance;
