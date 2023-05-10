import { userRoute } from "./user";
import { dogRoute } from "./dog";
import { likeRoute } from "./like";

export const getRoutes = {
  "user": userRoute,
  "dog": dogRoute,
  "like": likeRoute
}