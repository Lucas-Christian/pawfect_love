import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { dogRoute } from "./dog";

let req: Partial<Request>, emptyBodyReq: Partial<Request>, identicalReq: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;
const dog = {
  dog_id: 1,
  name: "Cleitinho",
  image_url: "https://adawdas/adwdaw.png"
};

beforeAll(() => {
  req = createMockedRequest({
    name: "Auebo",
    image: "https://adaw/Naice.png"
  }, { dog_id: "1" });
  emptyBodyReq = createMockedRequest({}, { dog_id: "1" }),
  identicalReq = createMockedRequest({
    name: "Cleitinho",
    image: "https://adawdas/adwdaw.png"
  }, { dog_id: "1" });
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.update.mockRejectedValueOnce(new Error("Erro ao tentar atualizar o cachorro no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método PATCH da rota dog funciona corretamente", () => {
  test("É esperado que o dog seja atualizado com sucesso (200)", async () => {
    db.findUnique.mockReturnValueOnce(dog).mockReturnValueOnce(null);
    await dogRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Sucesso ao atualizar o cachorro no banco de dados.",
    });
  });
  test("É esperado que não tenham dados para serem atualizados (400)", async () => {
    await dogRoute(emptyBodyReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "Você não forneceu um nome, ou imagem do cachorro para ser atualizada.",
    });
  });
  test("É esperado que o cachorro não seja encontrado (404)", async () => {
    await dogRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Esse cachorro não existe.",
    });
  });
  test("É esperado que ocorra um erro de conflito (409)", async () => {
    db.findUnique.mockReturnValueOnce(dog);
    await dogRoute(identicalReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      message: "Os dados para serem atualizados já são exatamente iguais aos do cachorro.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    dbWithError.findUnique.mockReturnValueOnce(dog);
    await dogRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível atualizar o cachorro no banco de dados.",
      error: expect.any(Error)
    });
  });
});