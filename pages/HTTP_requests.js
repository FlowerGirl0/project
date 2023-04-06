import { getSessionToken } from "@/utils";
import axios from "axios";
//import { toast } from 'react-toast';

//setup axios base url
const baseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  'http://localhost:3000/api/';

axios.interceptors.response.use(undefined, (error) => {
  const errors = error?.response?.data;
  /*
    toast.error(errors?.error_message || "Something went wrong! please refresh", {
    color: "#fff"
    })
    */
  throw errors;
  /*
    handle errors like 404, 405, 403, and Networking issues
    */
});

//extract response payload
const responseData = (response) => response.data;

const requestHeaders = (protectedRoute) => {
  let headers = {};
  headers["Accept"] = "application/json";
  // headers["ngrok-skip-browser-warning"] = "any";

  if (protectedRoute) {
    headers["Authorization"] = getSessionToken();
  }
  return {
    mode: "no-cors",
    headers,
  };
};

//http http_requests facade
const http_requests = {
  get: (protectedRoute, url) =>
    axios.get(url, requestHeaders(protectedRoute)).then(responseData),
  post: (protectedRoute, url, object) =>
    axios.post(url, object, requestHeaders(protectedRoute)).then(responseData),
  delete: (protectedRoute, url) =>
    axios.delete(url, requestHeaders(protectedRoute)).then(responseData),
  put: (protectedRoute, url, object) =>
    axios.put(url, object, requestHeaders(protectedRoute)).then(responseData),
};

export const apis = {
  login: (params) => http_requests.post(false, `${baseUrl}login`, params),
  registerUser: (params) => http_requests.post(false, `${baseUrl}register`, params),
  updateUser: (params) => http_requests.put(true, `${baseUrl}user`, params),
  getAccount: (id) => http_requests.get(false, `${baseUrl}login/${id}`),
};