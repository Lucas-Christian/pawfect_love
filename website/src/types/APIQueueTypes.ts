export type Url = 
  "/users" | `/user/${number}` | "/user" |
  "/admins" | `/admin/${number}` |
  "/dogs" | `/dog/${number}` |
  "/likes" | `/like/${number}/${number}` | `/like/${number}`;

export type Method = "GET" | "POST" | "DELETE" | "PATCH" | "PUT";

export type Body<U extends Url> =
  U extends "/user" ? { name?: string; email?: string; } | null | undefined : 
  U extends "/dog" ? { name?: string; image?: string; } | null | undefined :
  undefined;

export type User = { user_id: number; name: string; email: string; };
export type Dog = { dog_id: number; name: string; image_url: string; };
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

export type Res<U extends Url> =
  U extends "/users" ? { status: number; body: User[]; } :
  U extends `/user/${number}` ? { status: number; body: User; } :
  U extends "/user"? { status: number; body: User; } :
  U extends "/admins" ? { status: number; body: Admin[] } :
  U extends `/admin/${number}` ? { status: number; body: Admin } :
  U extends "/dogs" ? { status: number; body: Dog[] } :
  U extends `/dog/${number}` ? { status: number; body: Dog } :
  U extends "/likes" ? { status: number; body: Like[] } :
  { status: number; body: Like };

export type Req<U extends Url> = {
  method: Method;
  headers: {
    Authorization: string;
    "Content-Type": string;
  } & Headers
  body?: Body<U>;
} | null | undefined;