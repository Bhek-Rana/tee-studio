import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.STRAPI_API_URL, // Uses value from .env
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // Uses token from .env
  },
});
