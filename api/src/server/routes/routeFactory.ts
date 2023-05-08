import type { Request, Response } from "express";

export interface Route {
  path: string;
  method: "get" | "post" | "delete" | "patch" | "put";
  handler: (req: Request, res: Response) => void;
}

export class RouteFactory {
  public static createGetRoute(path: string, handler: (req: Request, res: Response) => void): Route {
    return {
      path,
      method: "get",
      handler,
    };
  }
  public static createPostRoute(path: string, handler: (req: Request, res: Response) => void): Route {
    return {
      path,
      method: "post",
      handler,
    };
  }
  public static createDeleteRoute(path: string, handler: (req: Request, res: Response) => void): Route {
    return {
      path,
      method: "delete",
      handler,
    };
  }
  public static createPatchRoute(path: string, handler: (req: Request, res: Response) => void): Route {
    return {
      path,
      method: "patch",
      handler,
    };
  }
  public static createPutRoute(path: string, handler: (req: Request, res: Response) => void): Route {
    return {
      path,
      method: "put",
      handler,
    };
  }
}