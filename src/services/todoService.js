import http from "./httpService";

const apiEndPoint = "/tasks";

export function getAllTodos() {
  return http.get(apiEndPoint);
}

export function getTodos(_id) {
  return http.get(`${apiEndPoint}/${_id}`);
}

export function saveTodo(todo) {
  if (todo._id) {
    const body = { ...todo };
    delete body._id;
    delete body.createdAt;
    delete body.updatedAt;

    return http.put(`${apiEndPoint}/${todo._id}`, body);
  }

  return http.post(apiEndPoint, todo);
}

export function deleteTodo(todo) {
  return http.delete(`${apiEndPoint}/${todo._id}`);
}
