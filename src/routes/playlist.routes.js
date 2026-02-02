import { Router } from "express";
import { createPlayList } from "../controllers/playlist.controller/createPlayList.js";
import { getPlayListById } from "../controllers/playlist.controller/getPlayListById.js";
import { getUserPlayList } from "../controllers/playlist.controller/getUserPlayList.js";
import { addVideoToPlayList } from "../controllers/playlist.controller/addVideoToPlayList.js";
import { removeVideoToPlayList } from "../controllers/playlist.controller/removeVideoToPlayList.js";
import { deletePlayList } from "../controllers/playlist.controller/deletePlaylist.js";
import { updatePlaylist } from "../controllers/playlist.controller/updatePlaylist.js";
import { getUserPlayListByID } from "../controllers/playlist.controller/getUserPlayListById.js";
import { getAllPlaylist } from "../controllers/playlist.controller/getAllPlaylist.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { Playlist } from "../models/playlists.model.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
const playlistRouter = Router();
playlistRouter.use(verifyJWT);

playlistRouter
  .route("/playlist-delete/:playlistId")
  .delete(
    authorizationMiddleware(["admin", "moderator"], Playlist, "playlistId"),
    deletePlayList,
  );

playlistRouter
  .route("/playlist-edit/:playlistId")
  .post(
    authorizationMiddleware([], Playlist, "playlistId"),
    upload.single("thumbnail"),
    updatePlaylist,
  );
playlistRouter
  .route("/delete/:playlistId/video/:videoId")
  .delete(removeVideoToPlayList);
playlistRouter.route("/add/:playlistId").post(addVideoToPlayList);
playlistRouter
  .route("/user-playlist/:userId")
  .get(cacheMiddleware, getUserPlayListByID);
playlistRouter.route("/user-playlist").get(cacheMiddleware, getUserPlayList);
playlistRouter
  .route("/playlist-video/:playlistId")
  .get(cacheMiddleware, getPlayListById);
playlistRouter.route("/all-playlist").get(cacheMiddleware, getAllPlaylist);
playlistRouter
  .route("/create-playlist")
  .post(upload.single("thumbnail"), createPlayList);
export default playlistRouter;
