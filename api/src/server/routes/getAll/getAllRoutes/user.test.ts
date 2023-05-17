import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { userRoute } from "./user";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest({}, {}, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.findMany.mockRejectedValueOnce(new Error("Erro ao buscar os usuários no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método GET da rota user funciona corretamente", () => {
  test("É esperado que os usuários sejam encontrados com sucesso (200)", async () => {
    const users = [{
      user_id: 1,
      name: "Paulinho",
      email: "dog@gmail.com"
    }];
    db.findMany.mockReturnValueOnce(users).mockReturnValueOnce(null);

    await userRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: users,
    });
  });
  test("É esperado que os usuários não sejam encontrados (404)", async () => {
    await userRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Não existem usuários no banco de dados.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await userRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Erro ao tentar buscar pelos usuários.",
      error: expect.any(Error)
    });
  });
});