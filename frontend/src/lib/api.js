import API from "../config/apiClient";

export const login = async (data) => API.post("/auth/login", data);

export const register = async (data) => API.post("/auth/register", data);

export const verifyEmail = async (code) =>
	API.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = async (email) =>
	API.post("/auth/password/forgot", { email });

export const resetPassword = async ({ verificationCode, password }) =>
	API.post("/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get("/user");

export const logout = async () => API.get("/auth/logout");

export const getSessions = async () => API.get("/sessions");

export const deleteSession = async (sessionId) =>
	API.delete(`/sessions/${sessionId}`);
