"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3ServiceImpl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = __importDefault(require("../../config"));
const crypto_1 = __importDefault(require("crypto"));
const sharp_1 = __importDefault(require("sharp"));
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: config_1.default.S3_ACCESS_KEY,
        secretAccessKey: config_1.default.S3_SECRET_ACCESS_KEY
    },
    region: config_1.default.S3_BUCKET_REGION
});
const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString('hex');
const s3ServiceImpl = () => {
    const uploadFile = async (file) => {
        //resize image 
        const buffer = await (0, sharp_1.default)(file.buffer).resize({ width: 600, height: 700, fit: 'fill' }).toBuffer();
        const imageName = randomImageName();
        const params = {
            Bucket: config_1.default.S3_BUCKET_NAME,
            Key: imageName,
            Body: buffer,
            ContentType: file.mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        await s3.send(command);
        return imageName;
    };
    const uploadAndGetUrl = async (file, postPic) => {
        let buffer;
        if (postPic) {
            buffer = await (0, sharp_1.default)(file.buffer).resize({ width: 300, height: 450, fit: 'fill' }).toBuffer();
        }
        else {
            buffer = await (0, sharp_1.default)(file.buffer).resize({ width: 250, height: 300 }).toBuffer();
        }
        const imageName = randomImageName();
        const params = {
            Bucket: config_1.default.S3_BUCKET_NAME,
            Key: imageName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };
        const command = new client_s3_1.PutObjectCommand(params);
        await s3.send(command);
        const url = `https://${config_1.default.S3_BUCKET_NAME}.s3.amazonaws.com/${imageName}`;
        return {
            imageName,
            url,
        };
    };
    const getSingleFile = async (imageName) => {
        const getObjectParams = {
            Bucket: config_1.default.S3_BUCKET_NAME,
            Key: imageName
        };
        const command = new client_s3_1.GetObjectCommand(getObjectParams);
        return await (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 6000000 });
    };
    const getMultipleFiles = async (posts) => {
        const postsWithUrl = [];
        for (const post of posts) {
            const getObjectParams = {
                Bucket: config_1.default.S3_BUCKET_NAME,
                Key: post.imageName
            };
            const command = new client_s3_1.GetObjectCommand(getObjectParams);
            const url = await (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 6000000 });
            postsWithUrl.push({ url, postName: post.imageName, description: post.description });
        }
        return postsWithUrl;
    };
    const removeFile = async (fileName) => {
        const params = {
            Bucket: config_1.default.S3_BUCKET_NAME,
            Key: fileName
        };
        const command = new client_s3_1.DeleteObjectCommand(params);
        return await s3.send(command);
    };
    return {
        uploadFile,
        getSingleFile,
        getMultipleFiles,
        removeFile,
        uploadAndGetUrl
    };
};
exports.s3ServiceImpl = s3ServiceImpl;
