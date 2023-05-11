import { Mock } from "vitest";

export type MockedDatabase = {
  create: Mock;
  delete: Mock;
  findUnique: Mock;
  findMany: Mock;
  update: Mock;
  upsert: Mock;
};