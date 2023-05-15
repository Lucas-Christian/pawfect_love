import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { adminRoute } from "./admin";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest(undefined, {
    user_id: "1",
    authorization: process.env["AUTHORIZATION_KEY"] as string
  });
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.findUnique.mockRejectedValueOnce(new Error("Erro ao buscar o administrador no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método GET da rota admin funciona corretamente", () => {
  test("É esperado que o admin seja encontrado com sucesso (200)", async () => {
    const user = {
      user_id: 1,
      name: "Paulinho",
      email: "dog@gmail.com"
    };
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);

    await adminRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: user,
    });
  });
  test("É esperado que o admin não seja encontrado (404)", async () => {
    await adminRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Admin não encontrado.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await adminRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível encontrar o admin no banco de dados.",
      error: expect.any(Error)
    });
  });
});