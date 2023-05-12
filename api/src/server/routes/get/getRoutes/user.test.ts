import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { userRoute } from "./user";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest(undefined, {
    user_id: "1"
  });
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.findUnique.mockRejectedValueOnce(new Error("Erro ao buscar pelo usuário no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método GET da rota user funciona corretamente", () => {
  test("É esperado que o user seja encontrado com sucesso (200)", async () => {
    const user = {
      user_id: 1,
      name: "Paulinho",
      email: "dog@gmail.com"
    };
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);

    await userRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: user,
    });
  });
  test("É esperado que o usuário não seja encontrado (404)", async () => {
    await userRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Usuário não encontrado.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await userRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi encontrar o usuário no banco de dados.",
      error: expect.any(Error)
    });
  });
});