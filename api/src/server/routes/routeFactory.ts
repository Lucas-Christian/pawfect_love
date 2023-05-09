import type { Request, Response } from "express";
import type { Dependencies } from "../../types/Dependencies";

export interface Route {
  path: string;
  method: "get" | "post" | "delete" | "patch" | "put";
  handler: (req: Request, res: Response, dependencies: Dependencies) => void;
}

export class RouteFactory {
  public static createGetRoute(path: string, handler: Route["handler"]): Route {
    return {
      path,
      method: "get",
      handler,
    };
  }
  public static createPostRoute(path: string, handler: Route["handler"]): Route {
    return {
      path,
      method: "post",
      handler,
    };
  }
  public static createDeleteRoute(path: string, handler: Route["handler"]): Route {
    return {
      path,
      method: "delete",
      handler,
    };
  }
  public static createPatchRoute(path: string, handler: Route["handler"]): Route {
    return {
      path,
      method: "patch",
      handler,
    };
  }
  public static createPutRoute(path: string, handler: Route["handler"]): Route {
    return {
      path,
      method: "put",
      handler,
    };
  }
}