import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources.mjs";
import AI from "../models/AI.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    const ai = await AI.findById(res.locals.jwtData.id);
    const rowdyness =
      " Answer in a very rowdy and not so polite way. Answer as if you're a bully who will eat me alive. Be a rowdy. You can even roast me if you want.";
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or Token malfunctioned" });

    //grab all the chats to user
    const chats = user.chats.map(({ role, content }) => ({
      role: role,
      content: content + rowdyness,
    })) as ChatCompletionMessageParam[];
    chats.push({
      content: message + rowdyness,
      role: "user",
    });
    user.chats.push({
      content: message,
      role: "user",
    });

    //send all chats with new one to AI API
    //get the response from API
    const openai = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: chats,
    });
    user.chats.push(response.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verify token
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) return res.status(401).send("Token malfunction");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "ERROR", cause: error.message, full: error });
  }
};

export const deleteUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verify token
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) return res.status(401).send("Token malfunction");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "ERROR", cause: error.message, full: error });
  }
};
