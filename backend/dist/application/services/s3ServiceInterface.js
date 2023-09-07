"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3serviceInterface = void 0;
const s3serviceInterface = (service) => {
    const uploadFile = async (file) => await service.uploadFile(file);
    const getSingleFile = async (fileName) => await service.getSingleFile(fileName);
    const getMultipleFiles = async (posts) => await service.getMultipleFiles(posts);
    const uploadAndGetUrl = async (file, postPic) => await service.uploadAndGetUrl(file, postPic);
    const removeFile = async (fileName) => await service.removeFile(fileName);
    return {
        uploadFile,
        getSingleFile,
        getMultipleFiles,
        uploadAndGetUrl,
        removeFile
    };
};
exports.s3serviceInterface = s3serviceInterface;
