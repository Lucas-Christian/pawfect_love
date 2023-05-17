import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { userRoute } from "./user";

let req: Partial<Request>, emptyBodyReq: Partial<Request>, identicalReq: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;
const user = {
  user_id: 1,
  name: "Paulinho",
  email: "dog@gmail.com"
}

beforeAll(() => {
  req = createMockedRequest({
    name: "Auebo",
    email: "dog2@gmail.com"
  }, { user_id: "1" }, {});
  emptyBodyReq = createMockedRequest({}, { user_id: "1" }, {}),
  identicalReq = createMockedRequest(user, { user_id: "1" }, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.update.mockRejectedValueOnce(new Error("Erro ao tentar atualizar o usuário no banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método PATCH da rota user funciona corretamente", () => {
  test("É esperado que o user seja atualizado com sucesso (200)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);
    await userRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Sucesso ao atualizar o usuário no banco de dados.",
    });
  });
  test("É esperado que não tenham dados para serem atualizados (400)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);
    await userRoute(emptyBodyReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: "Você não forneceu um nome ou um e-mail para ser atualizado.",
    });
  });
  test("É esperado que o usuário não seja encontrado (404)", async () => {
    await userRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Esse usuário não existe.",
    });
  });
  test("É esperado que ocorra um erro de conflito (409)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);
    await userRoute(identicalReq as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      message: "Os dados para serem atualizados já são exatamente iguais aos do usuário.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    dbWithError.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);
    await userRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível atualizar o usuário no banco de dados.",
      error: expect.any(Error)
    });
  });
});