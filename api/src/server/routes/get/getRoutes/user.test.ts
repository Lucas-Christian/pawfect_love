import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { userRoute } from "./user";

let req: Partial<Request>, emailReq: Partial<Request>, emptyReq: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest({}, { user_id: "1" }, {});
  emailReq = createMockedRequest({}, {}, { email: "dog@gmail.com" });
  emptyReq = createMockedRequest({}, {}, {});
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
  test("É esperado que o user seja encontrado com sucesso (200)", async () => {
    const user = {
      user_id: 1,
      name: "Paulinho",
      email: "dog@gmail.com"
    };
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);

    await userRoute(emailReq as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: user,
    });
  });
  test("É esperado que não tenham sido fornecidos dados o suficiente para encontrar o usuário (400)", async () => {
    await userRoute(emptyReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "Você não forneceu um email ou id de usuário válido para realizar a busca.",
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
      message: "Não foi possível encontrar o usuário no banco de dados.",
      error: expect.any(Error)
    });
  });
});