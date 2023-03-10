"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var instance = axios_1.default.create({
    baseURL: "https://gmail.googleapis.com/gmail/v1/users/".concat(process.env.GMAIL_USER),
    headers: {
        'Content-type': 'application/json',
    },
});
exports.default = instance;
