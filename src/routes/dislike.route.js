import { Router } from "express";
import { toggleVideoDisLike } from "../controllers/dislike.controller/toggleVideoDislike.js";
import { toggleCommentDisLike } from "../controllers/dislike.controller/toggleCommentDisLike.js";
import { toggleTweetDisLike } from "../controllers/dislike.controller/toggleTweetDislike.js";
import { stateOfTweetDisLike } from "../controllers/dislike.controller/stateOfTweetDisLike.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
const dislikeRouter = Router();
dislikeRouter.use(verifyJWT);
dislikeRouter.route("/comment-dislike/:commentId").get(toggleCommentDisLike);
dislikeRouter.route("/dislike-video/:videoId").get(toggleVideoDisLike);

dislikeRouter
  .route("/state-tweet-dislike/:tweetId")
  .get(cacheMiddleware, stateOfTweetDisLike);

dislikeRouter.route("/dislike-tweet/:tweetId").get(toggleTweetDisLike);

export default dislikeRouter;
