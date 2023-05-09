import type { Dependencies } from "../../types/Dependencies";
import { Request, Response } from "express";

export async function getRoute(req: Request, res: Response, { db }: Dependencies) {
  try {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    const routeName = pathname.split("/")[1];
    
    const getRoutes = {
      "user": (): void => {
        let user_id = req.params["user_id"];
        console.log(user_id);
      },
      "dog": (): void => {
        let dog_id = req.params["dog_id"];
        console.log(dog_id);
      },
      "like": (): void => {
        let user_id = req.params["user_id"];
        let dog_id = req.params["dog_id"];
        console.log(user_id);
        console.log(dog_id);
      }
    }

    let route = getRoutes[routeName as keyof typeof getRoutes];
    route();
    db.create("user", {
      data: {
        email: "teste@gmail.com",
        name: "teste"
      }
    });

    res.send("Olá mundo");
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
}