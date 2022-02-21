const path = require('path')
const SERVER_PORT = 8080;
const baseURL = process.env.NODE_ENV === 'development'
        ? `http://localhost:${SERVER_PORT}/`
        : 'http://lys.buctsnc.cn/';
const DB_NAME = process.env.NODE_ENV === 'development' ? 'video_recommend' : 'video_recommend';
module.exports = {
    //db
    DB_USER: 'root',
    DB_PASS: 'tb1766318380',
    DB_PORT: 3306,
    DB_NAME,
    DB_HOST: 'localhost',

    //server
    SERVER_PORT,
    baseURL,

    //path
    PATH_STATIC: path.resolve(__dirname, 'static'),
    PATH_UPLOAD: path.resolve(__dirname, 'upload'),
    PATH_NOTICE: path.resolve(__dirname, 'log/notice.log'),

    //secret
    suffix: 'aasfdsflksdfkdsf',
    secret: 'aaaaaaaaaaaaaaaaaaadsfasdfa'
}