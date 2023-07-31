import { S3ServiceImpl } from "@frameworks/services/s3BucketServie";
import { PostArrRespInterface } from "@interfaces/postInterface";

export const s3serviceInterface = (service : ReturnType<S3ServiceImpl>)=>{

    const uploadFile = async (file:Express.Multer.File) => await service.uploadFile(file)
    
    const getSingleFile = async (fileName : string) => await service.getSingleFile(fileName)

    const getMultipleFiles = async (posts:PostArrRespInterface[]) => await service.getMultipleFiles(posts)

    const uploadAndGetUrl = async (file:Express.Multer.File) => await service.uploadAndGetUrl(file)


    return {
        uploadFile,
        getSingleFile,
        getMultipleFiles,
        uploadAndGetUrl
    }
    
}

export type  S3ServiceInterface = typeof s3serviceInterface