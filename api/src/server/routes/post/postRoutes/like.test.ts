import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { likeRoute } from "./like";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest({}, {
    user_id: "1",
    dog_id: "1"
  }, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.create.mockRejectedValueOnce(new Error("Erro ao criar o like no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método POST da rota like funciona corretamente", () => {
  test("É esperado que o like seja criado no banco de dados com sucesso (201)", async () => {
    db.findUnique
      .mockReturnValueOnce({ user_id: 1, name: "Paulinho", email: "dog@gmail.com" })
      .mockReturnValueOnce({ dog_id: 1, name: "Cleitinho", image_url: "https://dadwadw/dawdaw.png" })
      .mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      message: "Sucesso ao criar novo like no banco de dados.",
    });
  });
  test("É esperado que o usuário não seja encontrado no banco de dados (404)", async () => {
    db.findUnique.mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "O usuário não existe.",
    });
  });
  test("É esperado que o cachorro não seja encontrado no banco de dados (404)", async () => {
    db.findUnique.mockReturnValueOnce({ id: 1, name: "Paulinho", email: "dog@gmail.com" }).mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "O cachorro não existe.",
    });
  });
  test("É esperado que o cachorro já tenha sido curtido (409)", async () => {
    db.findUnique
      .mockReturnValueOnce({ user_id: 1, name: "Paulinho", email: "dog@gmail.com" })
      .mockReturnValueOnce({ dog_id: 1, name: "Cleitinho", image: "https://dadwadw/dawdaw.png" })
      .mockReturnValueOnce({ like_id: 1, dog_id: 1, user_id: 1 });
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      message: "O usuário já curtiu este cachorro.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    dbWithError.findUnique
      .mockReturnValueOnce({ user_id: 1, name: "Paulinho", email: "dog@gmail.com" })
      .mockReturnValueOnce({ dog_id: 1, name: "Cleitinho", image: "https://dadwadw/dawdaw.png" })
      .mockReturnValueOnce(null);
    await likeRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível criar o like no banco de dados.",
      error: expect.any(Error)
    });
  });
});