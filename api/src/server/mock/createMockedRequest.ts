import type { Request } from "express";
import { MockedRequest } from "./types/MockedRequest";

type Body = {
  name?: string;
  email?: string;
  image?: string;
} | null | undefined;

export const createMockedRequest = (body?: Body, params?: Request["params"], data: MockedRequest = {}): MockedRequest => ({
  body: body,
  params: params,
  ...data,
});