import { RouteFactory } from "./routeFactory";
import { deleteRoute } from "./deleteRoute";
import { patchRoute } from "./patchRoute";
import { postRoute } from "./postRoute";
import { getRoute } from "./getRoute";
import { putRoute } from "./putRoute";

export const routes = [
  RouteFactory.createDeleteRoute("/user", deleteRoute),
  RouteFactory.createPatchRoute("/user", patchRoute),
  RouteFactory.createPostRoute("/user", postRoute),
  RouteFactory.createGetRoute("/user", getRoute),
  RouteFactory.createPutRoute("/user", putRoute)
]