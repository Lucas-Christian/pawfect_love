import type { Response } from "express";

export type MockedResponse = {
  json: (responseBody: any) => void;
} & Partial<Response>;