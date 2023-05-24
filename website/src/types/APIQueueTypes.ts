export type Url =
  "/users" | `/user/${string}` | "/user" |
  "/admins" | `/admin/${string}` |
  "/dogs" | `/dog/${string}` | "/dog" |
  "/likes" | `/likes/${string}` | `/like/${string}/${string}`;

export type Method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

export type Body<U extends Url> =
  U extends "/user" ? { name?: string; email?: string; } | null | undefined :
  U extends "/dog" ? { name?: string; image?: string; } | null | undefined :
  undefined;

export type User = { user_id: number; name: string; email: string; };
export type Dog = { dog_id: number; name: string; image_url: string; likes?: number };
export type Like = { like_id: number; user_id: number; dog_id: number; };
export type Admin = { admin_id: number; user_id: number; };

export type EnqueueParams<U extends Url> = {
  url: U,
  method: Method,
  reqBody?: Body<U>,
  reqHeaders?: Headers,
  callback?: ((response: Res<U>) => void)
}

export type Headers = {
  email?: string;
}

export type Req<U extends Url> = {
  method: Method;
  headers: {
    Authorization: string;
    "Content-Type": string;
  } & Headers
  body?: Body<U>;
} | null | undefined;

export type Res<U extends Url> =
  U extends "/users" ? { status: number; body: User[]; } :
  U extends `/user/${string}` ? { status: number; body: User; } :
  U extends "/user" ? { status: number; body: User; } :
  U extends "/admins" ? { status: number; body: Admin[] } :
  U extends `/admin/${string}` ? { status: number; body: Admin } :
  U extends "/dogs" ? { status: number; body: Dog[] } :
  U extends `/dog/${string}` ? { status: number; body: Dog } :
  U extends "/likes" ? { status: number; body: Like[] } :
  U extends `/likes/${string}` ? { status: number; body: Like[] } :
  { status: number; body: Like };