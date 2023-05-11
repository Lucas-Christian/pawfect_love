import { adminRoute } from "./admin";
import { userRoute } from "./user";
import { likeRoute } from "./like";
import { dogRoute } from "./dog";

export const getAllRoutes = {
  "user": userRoute,
  "dog": dogRoute,
  "like": likeRoute,
  "admin": adminRoute
}