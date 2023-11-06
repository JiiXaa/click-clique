import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
// multipart/form-data because we are expecting images to be uploaded
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// withCredentials allows us to send cookies with our requests
axios.defaults.withCredentials = true;

axios.defaults.xsrfCookieName = 'csrftoken';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const axiosReq = axios.create();
export const axiosRes = axios.create();
