const {secret} = require('../config')
const jwtAuth = require('koa-jwt')
module.exports = jwtAuth({ secret });