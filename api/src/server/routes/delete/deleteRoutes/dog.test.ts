import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { createMockedDatabase } from "../../../mock/createMockedDatabase";
import { createMockedResponse } from "../../../mock/createMockedResponse";
import { createMockedRequest } from "../../../mock/createMockedRequest";
import { Request, Response } from "express";
import { MockedDatabase } from "../../../mock/types/MockedDatabase";
import { dogRoute } from "./dog";

let req: Partial<Request>, res: Partial<Response>, db: MockedDatabase, dbWithError: MockedDatabase;
const dog = { 
  dog_id: 1, 
  name: "Cleitinho", 
  image_url: "https://adawdas/adwdaw.png" 
};
beforeAll(() => {
  req = createMockedRequest({}, { dog_id: "1" }, {});
  res = createMockedResponse();
  db = createMockedDatabase();
  dbWithError = createMockedDatabase();
  dbWithError.delete.mockRejectedValueOnce(new Error("Erro ao tentar deletar o administrador do banco de dados."));
});

afterAll(() => {
  vi.clearAllMocks();
});

describe("Verifica se o método DELETE da rota dog funciona corretamente", () => {
  test("É esperado que o dog seja deletado com sucesso (204)", async () => {
    db.findUnique.mockReturnValueOnce(dog).mockReturnValueOnce(null);

    await dogRoute(req as any, res as any, { db: db } as any);

    expect(res.json).toHaveBeenCalledWith({
      status: 204,
      message: "Sucesso ao deletar o cachorro do banco de dados.",
    });
  });
  test("É esperado que o cachorro não seja encontrado (404)", async () => {
    await dogRoute(req as any, res as any, { db: db } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Cachorro não encontrado.",
    });
  });
  test("É esperado um erro interno (500)", async () => {
    dbWithError.findUnique.mockReturnValueOnce(dog).mockReturnValueOnce(null);
    
    await dogRoute(req as any, res as any, { db: dbWithError } as any);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Não foi possível deletar o cachorro do banco de dados.",
      error: expect.any(Error)
    });
  });
});