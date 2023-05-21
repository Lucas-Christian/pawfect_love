import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { likeRoute } from "./like";

let req: Partial<Request>, reqWithDogId: Partial<Request>, malformedReq: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest({}, {}, {});
  reqWithDogId = createMockedRequest({}, {
    dog_id: "2"
  }, {});
  malformedReq = createMockedRequest({}, {
    dog_id: "aba"
  }, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.findMany.mockRejectedValueOnce(new Error("Erro ao buscar os likes no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método GET da rota like funciona corretamente", () => {
  test("É esperado que os likes sejam encontrados com sucesso (200)", async () => {
    const likes = [{
      like_id: 1,
      user_id: 1,
      dog_id: 1
    }];
    db.findMany.mockReturnValueOnce(likes).mockReturnValueOnce(null);

    await likeRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: likes,
    });
  });
  test("É esperado que os likes sejam encontrados com sucesso (200)", async () => {
    const likes = [{
      like_id: 1,
      user_id: 1,
      dog_id: 1
    }];
    db.findMany.mockReturnValueOnce(likes).mockReturnValueOnce(null);

    await likeRoute(reqWithDogId as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      body: likes,
    });
  });
  test("É esperado que os likes não sejam encontrados (404)", async () => {
    await likeRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Não existem likes no banco de dados.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await likeRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Erro ao tentar buscar pelos likes.",
      error: expect.any(Error)
    });
  });
});