const geoip = require('geoip-lite');
const fs = require('fs');
const pathlib = require('path');
let set = new Set();


module.exports = async (ctx,next) => {
    let ip = ctx.request.ip;
    // console.log(ip);
    // ip = '47.94.197.151';
    let location = geoip.lookup(ip);
    if(!set.has(ip)){
        console.log(ip);
        set.add(ip);
        let time = new Date();
        let info = {
            ip,
            city: location ? location.city : '无法解析',
            time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
        };
        fs.appendFile(pathlib.resolve(__dirname,'../log/visit.log'),JSON.stringify(info)+'\n', err => {
            if(err){
                console.log(err);
            }
        })
    }
    await next();
}
