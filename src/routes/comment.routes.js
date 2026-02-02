import { Router } from "express";

import { addComment } from "../controllers/comment.controller/create/addCommentForVideo.js";
import { getVideoComments } from "../controllers/comment.controller/read/getVideoComments.js";
import { deleteComment } from "../controllers/comment.controller/delete/deleteComment.js";
import { updateComment } from "../controllers/comment.controller/update/updateComment.js";
import { replyComment } from "../controllers/comment.controller/reply/video/replyToVideoComment.js";
import { getReplyComment } from "../controllers/comment.controller/read/getRepliesForComment.js";
import { getCommentById } from "../controllers/comment.controller/read/getCommentById.js";
import { getCommentByTweetId } from "../controllers/comment.controller/read/getCommentByTweetId.js";
import { addCommentForTweet } from "../controllers/comment.controller/create/addCommentForTweet.js";
import { replyCommentForTweet } from "../controllers/comment.controller/reply/tweet/replyToTweetComment.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { Comment } from "../models/comments.model.js";
const commentRouter = Router();
commentRouter.route("/comment-id/:commentId").get(getCommentById);
commentRouter.use(verifyJWT);
commentRouter
  .route("/comm/:commentId")
  .delete(
    authorizationMiddleware(["admin", "moderator"], Comment, "commentId"),
    deleteComment,
  )
  .patch(authorizationMiddleware([], Comment, "commentId"), updateComment)
  .post(replyComment)
  .get(cacheMiddleware, getReplyComment);

commentRouter
  .route("/tweet-comment/:tweetId")
  .get(cacheMiddleware, getCommentByTweetId);
commentRouter.route("/tweet-comment/:commentId").post(replyCommentForTweet);

commentRouter.route("/add-comment-tweet/:tweetId").post(addCommentForTweet);

commentRouter
  .route("/com/:videoId")
  .post(addComment)
  .get(verifyJWT, cacheMiddleware, getVideoComments);
export default commentRouter;
