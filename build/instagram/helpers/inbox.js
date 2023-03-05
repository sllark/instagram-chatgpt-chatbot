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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyUnreadMessages = exports.getThreadUser = exports.sendMessage = exports.getInbox = exports.messageAllInbox = void 0;
var models_1 = require("../../models");
var messageAllInbox = function (ig) { return __awaiter(void 0, void 0, void 0, function () {
    var inbox, _i, inbox_1, thread, user, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getInbox)(ig)];
            case 1:
                inbox = _a.sent();
                _i = 0, inbox_1 = inbox;
                _a.label = 2;
            case 2:
                if (!(_i < inbox_1.length)) return [3 /*break*/, 7];
                thread = inbox_1[_i];
                return [4 /*yield*/, (0, exports.getThreadUser)(thread)];
            case 3:
                user = _a.sent();
                message = "Good Night Queen \u2764 ".concat(user.messageCount > 0 ? '#' + (+user.messageCount + 1) : '');
                return [4 /*yield*/, (0, exports.sendMessage)(thread, message)];
            case 4:
                _a.sent();
                user.messageCount = +user.messageCount + 1;
                return [4 /*yield*/, user.save()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.messageAllInbox = messageAllInbox;
var getInbox = function (ig) { return __awaiter(void 0, void 0, void 0, function () {
    var chatFeed, inbox, _a, records;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                chatFeed = ig.feed.directInbox();
                _a = [[]];
                return [4 /*yield*/, chatFeed.records()];
            case 1:
                inbox = __spreadArray.apply(void 0, _a.concat([(_b.sent()), true]));
                _b.label = 2;
            case 2:
                if (!chatFeed.isMoreAvailable()) return [3 /*break*/, 4];
                return [4 /*yield*/, chatFeed.records()];
            case 3:
                records = _b.sent();
                inbox.push.apply(inbox, records);
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/, inbox];
        }
    });
}); };
exports.getInbox = getInbox;
var sendMessage = function (thread, message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, thread.broadcastText(message)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var getThreadUser = function (thread) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.User.findOne({ threadId: thread.threadId })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                user = new models_1.User({ threadId: thread.threadId });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, user];
        }
    });
}); };
exports.getThreadUser = getThreadUser;
var replyUnreadMessages = function (ig) { return __awaiter(void 0, void 0, void 0, function () {
    var inbox, _loop_1, _i, inbox_2, thread;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getInbox)(ig)];
            case 1:
                inbox = _a.sent();
                console.log(inbox);
                _loop_1 = function (thread) {
                    var shouldReply, userMessages, threadInbox, latestMessages;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                shouldReply = false;
                                userMessages = '';
                                return [4 /*yield*/, ig.feed.directThread({ thread_id: thread.threadId, oldest_cursor: '0' }).request()];
                            case 1:
                                threadInbox = _b.sent();
                                latestMessages = threadInbox.thread.items.reverse();
                                latestMessages.forEach(function (message) {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    if (message === null || message === void 0 ? void 0 : message.is_sent_by_viewer) {
                                        shouldReply = false;
                                    }
                                    else {
                                        shouldReply = true;
                                        if (message.item_type === 'text')
                                            userMessages += message.text + '\n';
                                    }
                                });
                                if (!shouldReply) return [3 /*break*/, 3];
                                // TODO: Integrate ChatGPT Here
                                return [4 /*yield*/, (0, exports.sendMessage)(thread, 'hello world')];
                            case 2:
                                // TODO: Integrate ChatGPT Here
                                _b.sent();
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, inbox_2 = inbox;
                _a.label = 2;
            case 2:
                if (!(_i < inbox_2.length)) return [3 /*break*/, 5];
                thread = inbox_2[_i];
                return [5 /*yield**/, _loop_1(thread)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.replyUnreadMessages = replyUnreadMessages;
