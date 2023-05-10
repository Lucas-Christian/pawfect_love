import type { Request, Response } from "express";
import type { Dependencies } from "../../../../types/Dependencies";

export async function dogRoute(req: Request, res: Response, { db }: Dependencies): Promise<void | Response> {

}