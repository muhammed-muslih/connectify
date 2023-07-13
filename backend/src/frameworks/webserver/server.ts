import {Application} from 'express'
import configKeys from '../../config'

const serverConfig = (app : Application) =>{

    const startServer = () =>{
        app.listen(configKeys.PORT,()=>{
            console.log(`server listening on ${configKeys.PORT}`.color_bg_at_256(15).bold)
        })
    }

    return {
        startServer
    }

}

export default serverConfig