import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { userRoute } from "./user";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;
const user = {
  user_id: 1,
  name: "Paulinho",
  email: "dog@gmail.com"
};

beforeAll(() => {
  req = createMockedRequest(undefined, {
    user_id: "1",
    authorization: process.env["AUTHORIZATION_KEY"] as string
  });
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.delete.mockRejectedValueOnce(new Error("Erro ao tentar deletar o administrador do banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método DELETE da rota user funciona corretamente", () => {
  test("É esperado que o user seja deletado com sucesso (204)", async () => {
    db.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);

    await userRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 204,
      message: "Sucesso ao deletar o usuário do banco de dados.",
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
    dbWithError.findUnique.mockReturnValueOnce(user).mockReturnValueOnce(null);
    await userRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível deletar o usuário do banco de dados.",
      error: expect.any(Error)
    });
  });
});