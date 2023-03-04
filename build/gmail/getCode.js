"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashMessage = exports.ExtractCodeFromMessage = exports.getCode = void 0;
var googleapis_1 = require("googleapis");
var axios_1 = __importDefault(require("../utils/axios"));
var oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
var getCode = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, response, code, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                return [4 /*yield*/, oAuth2Client.getAccessToken()];
            case 1:
                token = (_b.sent()).token;
                return [4 /*yield*/, axios_1.default.get('/messages', {
                        params: { maxResults: 1, q: 'from:instagram.com  is:unread  subject:"verify your account"' },
                        headers: {
                            'Authorization': "Bearer ".concat(token, " "),
                            'Content-type': 'application/json',
                        },
                    })];
            case 2:
                response = _b.sent();
                if (!(response.data && response.data.messages && response.data.messages[0])) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.ExtractCodeFromMessage)((_a = response.data.messages[0]) === null || _a === void 0 ? void 0 : _a.id, token)
                    // if (code) {
                    //   await TrashMessage(response.data.messages[0]?.id, token)
                    // }
                ];
            case 3:
                code = _b.sent();
                // if (code) {
                //   await TrashMessage(response.data.messages[0]?.id, token)
                // }
                return [2 /*return*/, code];
            case 4: return [2 /*return*/, 0];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, error_1];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getCode = getCode;
var ExtractCodeFromMessage = function (messageId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, code_1, message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("/messages/".concat(messageId), {
                        headers: {
                            'Authorization': "Bearer ".concat(token, " "),
                            'Content-type': 'application/json',
                        },
                    })];
            case 1:
                response = _a.sent();
                message = response.data.snippet.split(' ');
                message.forEach(function (word) {
                    if (!isNaN(parseInt(word)) && typeof parseInt(word) === 'number' && word.length === 6)
                        code_1 = parseInt(word);
                });
                return [2 /*return*/, code_1];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, error_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.ExtractCodeFromMessage = ExtractCodeFromMessage;
var TrashMessage = function (messageId, token) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("/messages/".concat(messageId, "/trash"), {
                        headers: {
                            'Authorization': "Bearer ".concat(token, " "),
                            'Content-type': 'application/json',
                        },
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, error_3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.TrashMessage = TrashMessage;
