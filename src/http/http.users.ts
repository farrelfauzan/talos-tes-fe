/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { NextResponse } from "next/server";

const token = getCookie("USER_TOKEN_DATA_PLATFORM");

const httpUsers = axios.create({
  baseURL: `${process.env.API_URL}/graphql`,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Add a request interceptor
httpUsers.interceptors.request.use(
  async (config) => {
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";
    }
    // Do something before request is sent
    return config;
  },
  (error: any) =>
    // Do something with request error
    // eslint-disable-next-line implicit-arrow-linebreak
    Promise.reject(error)
);

// Response interceptor for API calls
httpUsers.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // get response error code

    response,
  async (error) => {
    const { status } = error.response;
    // Do something with response error
    if (status === 401) {
      if (status === 403) {
        deleteCookie("USER_TOKEN_DATA_PLATFORM");
        NextResponse.redirect(`${process.env.CLIENT_URL}/auth/login`);
      }
    }
    return Promise.reject(error);
  }
);

export default httpUsers;
