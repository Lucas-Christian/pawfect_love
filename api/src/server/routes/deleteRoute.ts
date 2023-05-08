import { Request, Response } from "express";

export async function deleteRoute(req: Request, res: Response) {
  try {
    console.log(req.baseUrl);
    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
  }
}