import type { MockedResponse } from "./types/MockedResponse";
import { vi } from "vitest";

export const createMockedResponse = (): MockedResponse => {
  return { json: vi.fn() };
};