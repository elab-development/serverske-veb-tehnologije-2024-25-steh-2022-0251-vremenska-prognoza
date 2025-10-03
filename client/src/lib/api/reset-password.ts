import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const requestOtp = (email: string) =>
  api.post("/api/password/request-otp", { email });

export const verifyOtp = (email: string, otp: string) =>
  api.post("/api/password/verify-otp", { email, otp });

export const resetPassword = (email: string, otp: string, password: string) =>
  api.post("/api/password/reset-password", { email, otp, password });
