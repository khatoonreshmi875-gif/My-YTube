import { Router } from "express";
import { getReport } from "../controllers/report.controller.js/getReport.js";
import { postReport } from "../controllers/report.controller.js/report.js";
import { adminAuthorizationMiddleware } from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const reportRouter = Router();
reportRouter.use(verifyJWT);

reportRouter
  .route("/report/:userId")
  .get(adminAuthorizationMiddleware(["admin"]), getReport)
  .post(postReport);
export default reportRouter;
