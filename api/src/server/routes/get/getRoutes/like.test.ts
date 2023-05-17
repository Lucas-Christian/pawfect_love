import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { likeRoute } from "./like";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;
const user = {
  user_id: 1,
  name: "Paulinho",
  email: "dog@gmail.com"
};
const dog = {
  dog_id: 1,
  name: "Cleitinho",
  image_url: "https://adawdas/adwdaw.png"
};
const like = { like_id: 1, user_id: 1, dog_id: 1 };

beforeAll(() => {
  req = createMockedRequest({}, { user_id: "1" }, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.findUnique.mockRejectedValueOnce(new Error("Erro ao buscar pelo usuário no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método GET da rota like funciona corretamente", () => {
  test("É esperado que o like seja encontrado com sucesso (200)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(dog).mockReturnValueOnce(like);

    await likeRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: like,
    });
  });
  test("É esperado que o usuário não seja encontrado (404)", async () => {
    db.findUnique.mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "O usuário não existe.",
    });
  });
  test("É esperado que o cachorro não seja encontrado (404)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "O cachorro não existe.",
    });
  });
  test("É esperado que o like não seja encontrado (404)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(dog).mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Like não encontrado.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await likeRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível encontrar o like no banco de dados.",
      error: expect.any(Error)
    });
  });
});