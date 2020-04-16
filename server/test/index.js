const geo = require('geoip-lite');
let ip = '47.94.197.151';
console.log(geo.lookup(ip));