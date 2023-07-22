import configKeys from '../../config';
import {OAuth2Client} from 'google-auth-library'

const client = new OAuth2Client(configKeys.GOOGLE_AUTH_CLIENT_ID)

export  const googleAuthService = () =>{

    const verifyUser = async (token : string) =>{

        const user = {
            name : "",
            userName : "",
            email : "",
            isGoogleUser : true
        }
        try {

            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:configKeys.GOOGLE_AUTH_CLIENT_ID
            })

            console.log(ticket,'googleAuthTicket');
        
            const payload = ticket.getPayload()
            console.log(payload , 'google auth payload');
            
            console.log(payload);
            user.name = payload?.name ?? ""
            user.userName = payload?.given_name?? ""
            user.email = payload?.email ?? ""
            
        } catch (error) {

            console.log(error); 
            
        }
        
        return user
    }

    return {
        verifyUser
    }

}

export type GoogleAuthService = typeof googleAuthService