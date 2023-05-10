import type { Dependencies } from "../../../types/Dependencies";
import type { Request, Response } from "express";

export async function deleteRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {
  try {
    console.log(req.baseUrl);
    console.log(db);
    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
    return res.json({ status: 500, message: "Erro", error: err });
  }
}