/* eslint-disable no-param-reassign */
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = `${process.env.API_URL}/graphql`;

const httpAuth = axios.create({
  baseURL: GRAPHQL_ENDPOINT,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
httpAuth.interceptors.request.use(
  async (config) => {
    const token = getCookie("USER_TOKEN_DATA_PLATFORM");
    if (token) {
      config.headers.Authorization = `${token}`;
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";
    }
    // Do something before request is sent
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
httpAuth.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { status } = error.response;
    // Do something with response error
    if (status === 401 || status === 403) {
      deleteCookie("USER_TOKEN");
      NextResponse.redirect(`${process.env.CLIENT_URL}/auth/login`);
    }
    return Promise.reject(error);
  }
);

export default httpAuth;
