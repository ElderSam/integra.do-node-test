const axios = require('axios');

const api = axios.create({
    baseURL: "http://universities.hipolabs.com"
})

module.exports = api