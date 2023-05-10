import { userRoute } from "./user";
import { dogRoute } from "./dog";
import { likeRoute } from "./like";

export const postRoutes = {
  "user": userRoute,
  "dog": dogRoute,
  "like": likeRoute
}