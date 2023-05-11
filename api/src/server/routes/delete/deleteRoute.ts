import type { Dependencies } from "../../../types/Dependencies";
import type { Request, Response } from "express";
import { deleteRoutes } from "./deleteRoutes";

export async function deleteRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  try {
    if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
      return res.json({ status: 401, message: "Não autorizado." });
    }

    const routeName = req.originalUrl.split("/")[1];

    let route = deleteRoutes[routeName as keyof typeof deleteRoutes];
    route(req, res, { db });
  } catch(err) {
    console.log(err);
    return res.json({ status: 500, message: "Erro", error: err });
  }
}