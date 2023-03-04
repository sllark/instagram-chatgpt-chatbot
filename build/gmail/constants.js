"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailOptions = exports.auth = exports.generateConfig = void 0;
var generateConfig = function (url, accessToken) {
    return {
        method: 'get',
        url: url,
        headers: {
            'Authorization': "Bearer ".concat(accessToken, " "),
            'Content-type': 'application/json',
        },
    };
};
exports.generateConfig = generateConfig;
exports.auth = {
    type: 'OAuth2',
    user: 'abdulrehman.6ab@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};
exports.mailOptions = {
    from: 'Abdul <abdulrehman.6ab@gmail.com>',
    to: 'sid.cd.varma@gmail.com',
    subject: 'Gmail API NodeJS',
};
