import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { dogRoute } from "./dog";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest();
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.findMany.mockRejectedValueOnce(new Error("Erro ao buscar os cachorros no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método GET da rota dog funciona corretamente", () => {
  test("É esperado que os cachorros seja encontrado com sucesso (200)", async () => {
    const dogs = [{
      dog_id: 1,
      name: "Cleitinho",
      image_url: "https://adawdas/adwdaw.png"
    }];
    db.findMany.mockReturnValueOnce(dogs).mockReturnValueOnce(null);

    await dogRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: dogs,
    });
  });
  test("É esperado que os cachorros não sejam encontrados (404)", async () => {
    await dogRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Não existem cachorros no banco de dados.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await dogRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Erro ao tentar buscar pelos cachorros.",
      error: expect.any(Error)
    });
  });
});