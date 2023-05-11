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
    user_id: "1"
  });
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.create.mockRejectedValueOnce(new Error("Erro ao criar o administrador no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método POST da rota admin funciona corretamente", () => {
  test("É espero que o admin seja criado no banco de dados com sucesso (201)", async () => {
    await adminRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      message: "Sucesso ao criar o administrador no banco de dados.",
    });
  });
  test("É esperado um erro de conflito (409)", async () => {
    db.findUnique.mockReturnValueOnce({ id: 1, name: "John" }).mockReturnValueOnce(null);
    await adminRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      message: "Admin já existe no banco de dados.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await adminRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível criar o administrador no banco de dados.",
      error: expect.any(Error)
    });
  });
});