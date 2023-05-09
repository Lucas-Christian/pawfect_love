import type { Dependencies } from "../../types/Dependencies";
import { Request, Response } from "express";

export async function patchRoute(req: Request, res: Response, { db }: Dependencies) {
  try {
    console.log(db);
    console.log(req.baseUrl);
    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
  }
}