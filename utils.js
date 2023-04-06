import Cookies from 'js-cookie';
import jwt from  "jsonwebtoken";

export const getSessionToken = () => {
  let auth_token = null;``
  try {
    auth_token = Cookies.get("auth_token");
    return auth_token;
  } catch (e) {
    console.log("We have the error", e);
    return auth_token;
  }
};

export const getCurrentUser = () => {
  let auth_token = getSessionToken();
  const currentUser = jwt.verify(auth_token, process.env.JWT_SECRET);

  return currentUser;
};

export const saveSessionToken = (token) => {
  let cookie_params = {
    domain: process.env.REACT_APP_COOKIE_URL,
    secure: true,
    path: "/",
  };
  Cookies.set("auth_token", token, cookie_params);
};

export const removeSessionToken = () => {
  Cookies.remove("auth_token");
};
