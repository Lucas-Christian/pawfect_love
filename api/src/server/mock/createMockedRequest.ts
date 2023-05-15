import type { Request } from "express";
import { MockedRequest } from "./types/MockedRequest";

type Body = {
  name?: string;
  email?: string;
  image?: string;
} | null | undefined;

type Params = {
  authorization: string;
} & Request["params"];

export const createMockedRequest = (body?: Body, params?: Params, data: MockedRequest = {}): MockedRequest => ({
  body: body,
  params: params,
  ...data,
});