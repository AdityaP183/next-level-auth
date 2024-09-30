import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCodes";
import { verifyToken } from "../utils/jwt";
import mongoose from "mongoose";

export const authenticate: RequestHandler = (req, res, next) => {
	const accessToken = req.cookies.accessToken as string | undefined;
	appAssert(
		accessToken,
		UNAUTHORIZED,
		"Not authorized",
		AppErrorCode.InvalidAccessToken
	);

	const { payload, error } = verifyToken(accessToken);
	appAssert(
		payload,
		UNAUTHORIZED,
		error === "jwt expired" ? "Token expired" : "Invalid token",
		AppErrorCode.InvalidAccessToken
	);

	req.userId = payload.userId as mongoose.Types.ObjectId;
	req.sessionId = payload.sessionId as mongoose.Types.ObjectId;

	next();
};
