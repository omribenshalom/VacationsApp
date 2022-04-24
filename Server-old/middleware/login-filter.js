const expressJwt = require('express-jwt');
const config = require('../config.json');

let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add('/users/login');

function authenticateJwtRequestToken() {
    return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
        console.log("Method = " + request.method);
        console.log("request.url = " + request.url);

        if (request.method == 'POST' && request.url.endsWith('/users')) {
            console.log("Returned true");
            return true;
        };

        if (whiteListUrls.has(request.url)) {
            return true;
        }
        return false;
    });
};

module.exports = authenticateJwtRequestToken;