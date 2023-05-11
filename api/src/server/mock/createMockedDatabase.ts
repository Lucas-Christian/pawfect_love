import type { MockedDatabase } from "./types/MockedDatabase";
import { vi } from "vitest";

export const createMockedDatabase = (): MockedDatabase => ({
  create: vi.fn(),
  delete: vi.fn(),
  findUnique: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
  upsert: vi.fn()
});