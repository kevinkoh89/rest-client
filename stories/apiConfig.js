import { Endpoint, Request } from '../src';

// https://reqres.in/api/users
const apiConfig = {
  getUsers: Endpoint(Request.GET, "/users"),
  apiGetWithParam: Endpoint(Request.GET, "/uri/{param1}/{param2}"),
  createUser: Endpoint(Request.POST, "/users"),
  getUser: Endpoint(Request.DELETE, "/users/{id}")
};

export default apiConfig;
