import http from "./httpService";

const apiEndPoint = "/users";

export function getUser() {
  return http.get(`${apiEndPoint}/me`);
}

export function registerUser(user) {
  return http.post(apiEndPoint, user);
}
