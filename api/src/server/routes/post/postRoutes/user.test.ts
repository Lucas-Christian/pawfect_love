import { describe, test, expect, beforeAll, afterAll, vi, afterEach } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { userRoute } from "./user";

let req: Partial<Request>, malformedReq: Partial<Request>, existentEmailReq: Partial<Request>, 
res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;

beforeAll(() => {
  req = createMockedRequest({
    name: "Paulinho",
    email: "dog@gmail.com"
  }, {}, {});
  existentEmailReq = createMockedRequest({
    name: "cleiton",
    email: "dog@gmail.com"
  }, {}, {});
  malformedReq = createMockedRequest({
    name: "Paulinho"
  }, {}, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.create.mockRejectedValueOnce(new Error("Erro ao criar o usuário no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método POST da rota user funciona corretamente", () => {
  test("É esperado que o usuário seja criado no banco de dados com sucesso (201)", async () => {
    await userRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      message: "Sucesso ao criar o Paulinho no banco de dados.",
    });
  });
  test("É esperado um erro de má formação do request (400)", async () => {
    await userRoute(malformedReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "O nome ou o e-mail do usuário não foi fornecido.",
    });
  });
  test("É esperado um erro de conflito (409)", async () => {
    db.findUnique.mockReturnValueOnce({ id: 1, name: "Paulinho", email: "dog@gmail.com" }).mockReturnValueOnce(null);
    await userRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      message: "Um usuário já está utilizando esse e-mail.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    await userRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível criar o usuário no banco de dados.",
      error: expect.any(Error)
    });
  });
});