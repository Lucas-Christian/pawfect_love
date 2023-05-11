import { RouteFactory } from "./routeFactory";
import { deleteRoute } from "./delete/deleteRoute";
import { getAllRoute } from "./getAll/getAllRoute";
import { patchRoute } from "./patch/patchRoute";
import { postRoute } from "./post/postRoute";
import { getRoute } from "./get/getRoute";
import { putRoute } from "./put/putRoute";

export const routes = [
  RouteFactory.createDeleteRoute("/user", deleteRoute),
  RouteFactory.createPatchRoute("/user", patchRoute),
  RouteFactory.createGetRoute("/user/:user_id", getRoute),
  RouteFactory.createGetRoute("/user", getAllRoute),
  RouteFactory.createPostRoute("/user", postRoute),
  RouteFactory.createPutRoute("/user", putRoute),
  RouteFactory.createDeleteRoute("/dog", deleteRoute),
  RouteFactory.createPatchRoute("/dog", patchRoute),
  RouteFactory.createGetRoute("/dog/:dog_id", getRoute),
  RouteFactory.createGetRoute("/dog", getAllRoute),
  RouteFactory.createPostRoute("/dog", postRoute),
  RouteFactory.createPutRoute("/dog", putRoute),
  RouteFactory.createDeleteRoute("/like", deleteRoute),
  RouteFactory.createGetRoute("/like/:user_id/:dog_id", getRoute),
  RouteFactory.createGetRoute("/like", getAllRoute),
  RouteFactory.createPostRoute("/like", postRoute),
  RouteFactory.createDeleteRoute("/admin", deleteRoute),
  RouteFactory.createGetRoute("/admin/:user_id", getRoute),
  RouteFactory.createGetRoute("/admin", getAllRoute),
  RouteFactory.createPostRoute("/admin", postRoute)
]