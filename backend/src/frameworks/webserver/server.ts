import { Application } from "express";
import {Server} from 'http'
import configKeys from "../../config";

const serverConfig = (server: Server) => {
  const startServer = () => {
    server.listen(configKeys.PORT, () => {
      console.log(
        `server listening on ${configKeys.PORT}`.color_bg_at_256(15).bold
      );
    });
  };

  return {
    startServer,
  };
};

export default serverConfig;
