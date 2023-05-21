import { RouteFactory } from "./routeFactory";
import { deleteRoute } from "./delete/deleteRoute";
import { getAllRoute } from "./getAll/getAllRoute";
import { patchRoute } from "./patch/patchRoute";
import { postRoute } from "./post/postRoute";
import { getRoute } from "./get/getRoute";
import { putRoute } from "./put/putRoute";

export const routes = [
  RouteFactory.createDeleteRoute("/user/:user_id", deleteRoute),
  RouteFactory.createPatchRoute("/user/:user_id", patchRoute),
  RouteFactory.createGetRoute("/user/:user_id", getRoute),
  RouteFactory.createGetRoute("/user", getRoute),
  RouteFactory.createGetRoute("/users", getAllRoute),
  RouteFactory.createPostRoute("/user", postRoute),
  RouteFactory.createPutRoute("/user", putRoute),
  RouteFactory.createDeleteRoute("/dog/:dog_id", deleteRoute),
  RouteFactory.createPatchRoute("/dog/:dog_id", patchRoute),
  RouteFactory.createGetRoute("/dog/:dog_id", getRoute),
  RouteFactory.createGetRoute("/dogs", getAllRoute),
  RouteFactory.createPostRoute("/dog", postRoute),
  RouteFactory.createPutRoute("/dog/:dog_id", putRoute),
  RouteFactory.createDeleteRoute("/like/:user_id/:dog_id", deleteRoute),
  RouteFactory.createGetRoute("/like/:user_id/:dog_id", getRoute),
  RouteFactory.createGetRoute("/likes/:dog_id", getAllRoute),
  RouteFactory.createGetRoute("/likes", getAllRoute),
  RouteFactory.createPostRoute("/like/:user_id/:dog_id", postRoute),
  RouteFactory.createDeleteRoute("/admin/:user_id", deleteRoute),
  RouteFactory.createGetRoute("/admin/:user_id", getRoute),
  RouteFactory.createGetRoute("/admins", getAllRoute),
  RouteFactory.createPostRoute("/admin/:user_id", postRoute)
]