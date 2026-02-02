import { Router } from "express";
import { toggletweetLike } from "../controllers/like.controller.js/toggleTweetLike.js";
import { toggleCommentLike } from "../controllers/like.controller.js/toggleCommentLike.js";
import { toggleVideoLike } from "../controllers/like.controller.js/toggleVideoLike.js";
import { getLikedVideos } from "../controllers/like.controller.js/getLikedVideos.js";
import { stateOfTweetLike } from "../controllers/like.controller.js/stateOfTweetLike.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";

const likeRouter = Router();
likeRouter.use(verifyJWT);
likeRouter.route("/comment-like/:commentId").get(toggleCommentLike);
likeRouter.route("/video/:videoId").get(toggleVideoLike);
likeRouter.route("/state-tweet-like/:tweetId").get(cacheMiddleware,stateOfTweetLike);

likeRouter.route("/toggle-tweet/:tweetId").get(toggletweetLike);

likeRouter
  .route("/liked-videos")
  .get(verifyJWT,cacheMiddleware, getLikedVideos);

export default likeRouter;
