import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { dogRoute } from "./dog";

let req: Partial<Request>, malformedReq: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest({
    name: "bartolomeu", image: "https://adawd/dawdd/imagem.png"
  },
  {
    authorization: process.env["AUTHORIZATION_KEY"] as string
  });
  malformedReq = createMockedRequest({
    name: "bartolomeu 2"
  },
  {
    authorization: process.env["AUTHORIZATION_KEY"] as string
  });
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.create.mockRejectedValueOnce(new Error("Erro ao criar o cachorro no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método POST da rota dog funciona corretamente", () => {
  test("É esperado que o dog seja criado no banco de dados com sucesso (201)", async () => {
    await dogRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      message: "Sucesso ao criar o bartolomeu no banco de dados.",
    });
  });
  test("É esperado um erro de má formação do request (400)", async () => {
    await dogRoute(malformedReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "Nome, ou imagem do cachorro não fornecido.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await dogRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível inserir o cachorro no banco de dados.",
      error: expect.any(Error)
    });
  });
});