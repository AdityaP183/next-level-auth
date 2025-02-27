import mongoose from "mongoose";
import { NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
	const user = await UserModel.findById(
		req.userId as mongoose.Types.ObjectId
	);
	appAssert(user, NOT_FOUND, "User not found");

	return res.status(OK).json({ user: user.omitPassword() });
});
