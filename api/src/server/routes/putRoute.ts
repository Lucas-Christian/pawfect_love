import type { Dependencies } from "../../types/Dependencies";
import { Request, Response } from "express";

export async function putRoute(req: Request, res: Response, { db }: Dependencies) {
  try {
    console.log(req.baseUrl);
    console.log(db);
    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
  }
}