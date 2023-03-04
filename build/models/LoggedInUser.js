"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedInUser = void 0;
var mongoose_1 = require("mongoose");
var LoggedInUserSchema = new mongoose_1.Schema({
    data: {
        type: mongoose_1.Schema.Types.String,
        set: function (data) {
            return typeof data === 'string' ? data : JSON.stringify(data);
        },
    },
});
exports.LoggedInUser = (0, mongoose_1.model)('LoggedInUser', LoggedInUserSchema);
