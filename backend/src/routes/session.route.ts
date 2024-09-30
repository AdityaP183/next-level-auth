import { Router } from "express";
import {
	sessionDeleteHandler,
	sessionsHandler,
} from "../controllers/session.controller";

const sessionRoutes = Router();

sessionRoutes.get("/", sessionsHandler);
sessionRoutes.get("/:id", sessionDeleteHandler);

export default sessionRoutes;
