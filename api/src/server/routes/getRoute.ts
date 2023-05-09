import type { Dependencies } from "../../types/Dependencies";
import { Request, Response } from "express";

export async function getRoute(req: Request, res: Response, { db }: Dependencies): Promise<Response | void> {
  try {
    if(req.headers.authorization !== process.env["AUTHORIZATION_KEY"]) {
      return res.json({ status: 403, message: "Não autorizado." });
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const routeName = pathname.split("/")[1];
    
    const getRoutes = {
      "user": async (): Promise<void | Response> => {
        let user_id = parseInt(req.params["user_id"]!);
        if(!user_id) {
          return res.json({ status: 400, message: "ID de usuário não fornecido." });
        }
        let user = await db.findUnique("user", {
          where: {
            user_id: user_id
          }
        });
        if(user === null || !user) return res.json({ status: 404, message: "Usuário não encontrado." })
        res.json({ status: 200, body: user });
      },
      "dog": async (): Promise<void | Response> => {
        let dog_id = parseInt(req.params["dog_id"]!);
        if(!dog_id) {
          return res.json({ status: 400, message: "ID do cachorro não fornecido." });
        }
        let dog = await db.findUnique("dog", {
          where: {
            dog_id: dog_id
          }
        });
        if(dog === null || !dog) return res.json({ status: 404, message: "Cachorro não encontrado." })
        res.json({ status: 200, body: dog });
      },
      "like": async (): Promise<void | Response> => {
        let user_id = parseInt(req.params["user_id"]!), 
        dog_id = parseInt(req.params["dog_id"]!);

        if(!dog_id || !user_id) {
          return res.json({ status: 400, message: "ID do cachorro ou ID de usuário não fornecido." });
        }

        let like = await db.findMany("like", {
          where: {
            user_id: user_id,
            dog_id: dog_id
          }
        });

        if(like[0] === null || !like[0]) return res.json({ status: 404, message: "Like não encontrado." })
        res.json({ status: 200, body: like[0] });
      }
    }

    let route = getRoutes[routeName as keyof typeof getRoutes];
    route();
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Erro" });
  }
}