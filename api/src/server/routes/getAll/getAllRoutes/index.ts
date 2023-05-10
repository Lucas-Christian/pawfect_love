import { userRoute } from "./user";
import { dogRoute } from "./dog";
import { likeRoute } from "./like";

export const getAllRoutes = {
  "user": userRoute,
  "dog": dogRoute,
  "like": likeRoute
}