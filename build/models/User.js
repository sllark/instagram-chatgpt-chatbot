"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    threadId: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    messageCount: { type: mongoose_1.Schema.Types.Number, default: 1 },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
