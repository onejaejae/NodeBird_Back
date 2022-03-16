import express from "express";
import { createPost, deletePost } from "../controllers/postController";

const postRoute = express.Router();

postRoute.post("/", createPost);
postRoute.delete("/", deletePost);

export default postRoute;
