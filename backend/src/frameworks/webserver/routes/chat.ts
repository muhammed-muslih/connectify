import express from "express";
import chatController from "@adapters/controllers/chatController";
import { chatRepoImpl } from "@frameworks/database/mongoDb/repositories/chatRepoImpl";
import { chatRepoInterface } from "@application/repositories/chatRepoInterface";

const chatRouter = () => {
  const router = express.Router();
  const controller = chatController(chatRepoImpl, chatRepoInterface);

  router.post("/", controller.acessUserChat);
  router.get("/", controller.fetchUserChats);

  return router;
};

export default chatRouter;
