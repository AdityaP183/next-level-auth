import jwt, { SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";

export type RefreshTokenPayload = {
	sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
	userId: UserDocument["_id"];
	sessionId: SessionDocument["_id"];
};

type SignOptionsWithSecret = SignOptions & {
	secret: string;
};

const defaults: SignOptions = {
	audience: ["user"],
};

const accessTokenSignOptions: SignOptionsWithSecret = {
	expiresIn: "15m",
	secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsWithSecret = {
	expiresIn: "30d",
	secret: JWT_REFRESH_SECRET,
};

export const signToken = (
	payload: RefreshTokenPayload | AccessTokenPayload,
	options?: SignOptionsWithSecret
) => {
	const { secret, ...signOptions } = options || accessTokenSignOptions;
	return jwt.sign(payload, secret, { ...signOptions, ...defaults });
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
	token: string,
	options?: VerifyOptions & { secret: string }
) => {
	const { secret = JWT_SECRET, ...verifyOpts } = options || {};
	try {
		const payload = jwt.verify(token, secret, {
			...defaults,
			...verifyOpts,
		}) as TPayload;
		return {
			payload,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
};