import Cookies from 'js-cookie';
import jwt from  "jsonwebtoken";

export const getSessionToken = () => {
  let auth_token__ = null;``
  try {
    auth_token__ = Cookies.get("auth_token__");
    return auth_token__;
  } catch (e) {
    console.log("We have the error", e);
    return auth_token__;
  }
};

export const getCurrentUser = () => {
  let auth_token__ = getSessionToken();
  const currentUser = jwt.verify(auth_token__, process.env.JWT_SECRET);

  return currentUser;
};

export const saveSessionToken = (token) => {
  let cookie_params = {
    domain: process.env.REACT_APP_COOKIE_URL,
    secure: true,
    path: "/",
  };
  Cookies.set("auth_token__", token, cookie_params);
};

export const removeSessionToken = () => {
  Cookies.remove("auth_token__");
};
