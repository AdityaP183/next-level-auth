import AppErrorCode from "../constants/appErrorCodes";
import { HttpStatusCode } from "../constants/http";

class AppError extends Error {
	constructor(
		public statusCode: HttpStatusCode,
		public message: string,
		public errorCode?: AppErrorCode
	) {
		super(message);
	}
}

export default AppError;