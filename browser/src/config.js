const HOST = 'localhost';
const PORT = 8080;
const baseURL_dev = `http://${HOST}:${PORT}`;
const baseURL_pro = `http://lys.buctsnc.cn`;
export const baseURL = process.env.NODE_ENV === 'development' ? baseURL_dev : baseURL_pro;
