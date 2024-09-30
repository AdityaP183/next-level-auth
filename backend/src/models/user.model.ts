import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(value: string): Promise<boolean>;
	omitPassword(): Pick<
		UserDocument,
		"_id" | "email" | "verified" | "createdAt" | "updatedAt" | "__v"
	>;
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await hashValue(this.password, 12);
	next();
});

userSchema.methods.comparePassword = async function (value: string) {
	return await compareValue(value, this.password);
};

userSchema.methods.omitPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
