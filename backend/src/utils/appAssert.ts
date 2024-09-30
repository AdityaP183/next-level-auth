import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCodes";

type AppAssert = (
	condition: any,
	httpStatusCode: HttpStatusCode,
	message: string,
	appErrorCodes?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert = (
	condition,
	httpStatusCode,
	message,
	appErrorCodes
) => assert(condition, new AppError(httpStatusCode, message, appErrorCodes));

export default appAssert;
