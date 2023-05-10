import { userRoute } from "./user";
import { dogRoute } from "./dog";
import { likeRoute } from "./like";

export const patchRoutes = {
  "user": userRoute,
  "dog": dogRoute,
  "like": likeRoute
}