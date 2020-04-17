// const geo = require('geoip-lite');
// let ip = '47.94.197.151';
// console.log(geo.lookup(ip));

let pro = Promise.reject('error');
pro.catch(err => {
    console.log(err);
    throw err;
}).catch(console.log);
