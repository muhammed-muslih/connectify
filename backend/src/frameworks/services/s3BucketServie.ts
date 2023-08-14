import { S3Client,PutObjectCommand ,GetObjectCommand,DeleteObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PostArrRespInterface } from "@interfaces/postInterface";
import configKeys from "../../config";
import crypto from 'crypto'
import sharp from 'sharp'

const s3 = new S3Client({
    credentials : {
        accessKeyId:configKeys.S3_ACCESS_KEY,
        secretAccessKey:configKeys.S3_SECRET_ACCESS_KEY
    },
    region : configKeys.S3_BUCKET_REGION

})

const randomImageName = (bytes = 32) =>crypto.randomBytes(bytes).toString('hex')

export const s3ServiceImpl = () =>{

    const uploadFile = async(file:Express.Multer.File) => {  
        //resize image 
        const buffer = await sharp(file.buffer).resize({width:600,height:700,fit:'fill'}).toBuffer()
        const imageName : string = randomImageName()
        const params = {
            Bucket: configKeys.S3_BUCKET_NAME,
            Key:imageName,
            Body:buffer,
            ContentType : file.mimetype,
        }
        const command = new PutObjectCommand(params)
        await s3.send(command)

        return imageName

    }

    const uploadAndGetUrl = async (file: Express.Multer.File,postPic:boolean) => {
        let buffer
        if(postPic){
            buffer = await sharp(file.buffer).resize({width:600,height:750,fit:'fill'}).toBuffer()
        }else{
            buffer = await sharp(file.buffer).resize({width:250,height:300}).toBuffer()
        }
        const imageName = randomImageName();
        const params = {
          Bucket: configKeys.S3_BUCKET_NAME,
          Key: imageName,
          Body:buffer,
          ContentType: file.mimetype,
          ACL: 'public-read', 
        }
        const command = new PutObjectCommand(params);
        await s3.send(command);
        const url = `https://${configKeys.S3_BUCKET_NAME}.s3.amazonaws.com/${imageName}`;
        return {
          imageName,
          url,
        }
      }
    

    const getSingleFile = async (imageName : string) => {
        const getObjectParams = {
            Bucket : configKeys.S3_BUCKET_NAME,
            Key : imageName
        }
        const command = new GetObjectCommand(getObjectParams);
        return await getSignedUrl(s3,command,{expiresIn:6000000})
    }


    const getMultipleFiles = async(posts :PostArrRespInterface[]) =>{
        const postsWithUrl = []
        for(const post of posts) {
            const getObjectParams = {
                Bucket : configKeys.S3_BUCKET_NAME,
                Key :post.imageName
            }
             const command = new GetObjectCommand(getObjectParams);
             const url = await getSignedUrl(s3,command,{expiresIn:6000000})
             postsWithUrl.push({url,postName :post.imageName,description:post.description})
        }
        return postsWithUrl
    }

    const removeFile = async (fileName : string) => {

        const params = {
            Bucket : configKeys.S3_BUCKET_NAME,
            Key : fileName
        }

        const command = new DeleteObjectCommand(params)
        return  await s3.send(command)
    }


    return {
        uploadFile,
        getSingleFile,
        getMultipleFiles,
        removeFile,
        uploadAndGetUrl
    }
}

export type S3ServiceImpl = typeof s3ServiceImpl