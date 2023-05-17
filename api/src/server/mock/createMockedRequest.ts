import type { Request } from "express";
import { MockedRequest } from "./types/MockedRequest";

type Body = {
  name?: string;
  email?: string;
  image?: string;
} | null | undefined;

type Headers = {
  email?: string;
  authorization?: string;
}

export const createMockedRequest = (body: Body | {}, params: Request["params"] | {}, headers: Headers | {}, data: MockedRequest = {}): MockedRequest => ({
  body: body,
  params: params,
  headers: headers,
  ...data,
});