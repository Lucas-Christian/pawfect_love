import { adminRoute } from "./admin";
import { userRoute } from "./user";
import { likeRoute } from "./like";
import { dogRoute } from "./dog";

export const getAllRoutes = {
  "users": userRoute,
  "dogs": dogRoute,
  "likes": likeRoute,
  "admins": adminRoute
}