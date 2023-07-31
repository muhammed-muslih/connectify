import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import configKeys from '../../config'
import { TokenGenerateInt } from '@interfaces/tokenInterface'


export const authServices = () =>{

    const encryptPassword = async (password : string) =>{
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password,salt)
        return password
    }

    const comparePassword = (password : string , hashedPassword : string) =>{
        return bcrypt.compare(password,hashedPassword)
    }

    const generateToken = (payload : TokenGenerateInt) =>{
        const token = jwt.sign({payload},configKeys.JWT_SECRET,{
            expiresIn:'3d'
        })

        return token
    }

    const verifyToken = (token : string) =>{
        return jwt.verify(token,configKeys.JWT_SECRET)
    }

    const generateRandomNumber = () => {
        // Generate a random number between 0 and 9999
        const randomNumber: number = Math.floor(Math.random() * 10000);
        return randomNumber
    }

    return{
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        generateRandomNumber
    }
}

export type AuthServices = typeof authServices