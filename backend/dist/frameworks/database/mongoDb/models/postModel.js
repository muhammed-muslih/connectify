"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    imageName: String,
    imageUrl: String,
    description: String,
    date: { type: Date, default: Date.now },
    likes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            replies: [
                {
                    text: String,
                    created: { type: Date, default: Date.now },
                    postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
                }
            ]
        }
    ],
    delete: {
        type: Boolean,
        default: false,
    },
    report: [
        {
            text: String,
            reportedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            created: { type: Date, default: Date.now },
        }
    ]
});
const Posts = (0, mongoose_1.model)('Posts', postSchema, 'posts');
exports.default = Posts;
