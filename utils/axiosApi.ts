import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === "undefined";

export interface IAxiosError extends AxiosError {}
export const isAxiosError = axios.isAxiosError;

const axiosApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApi.interceptors.request.use(async (request) => {
  if (isServer) {
  } else {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.jwt.access_token}`;
    }
  }

  return request;
});

export default axiosApi;
