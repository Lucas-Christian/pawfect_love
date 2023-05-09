import type { Admin, Dog, Like, Prisma, User } from "@prisma/client";

export type ModelType = "user" | "dog" | "like" | "admin";

export type ModelTypeData<T extends ModelType> = 
  T extends "user" ? Prisma.Prisma__UserClient<User | null, null>:
  T extends "dog" ? Prisma.Prisma__DogClient<Dog, null> :
  T extends "like" ? Prisma.Prisma__LikeClient<Like, null> :
  T extends "admin" ? Prisma.Prisma__AdminClient<Admin, null> :
  never;

export type CreateArgs<T extends ModelType> =
  T extends "user" ? Prisma.UserCreateArgs :
  T extends "dog" ? Prisma.DogCreateArgs :
  T extends "like" ? Prisma.LikeCreateArgs :
  T extends "admin" ? Prisma.AdminCreateArgs :
  never;

export type DeleteArgs<T extends ModelType> =
  T extends "user" ? Prisma.UserDeleteArgs :
  T extends "dog" ? Prisma.DogDeleteArgs :
  T extends "like" ? Prisma.LikeDeleteArgs :
  T extends "admin" ? Prisma.AdminDeleteArgs :
  never;

export type FindUniqueArgs<T extends ModelType> = 
  T extends "user" ? Prisma.UserFindUniqueArgs :
  T extends "dog" ? Prisma.DogFindUniqueArgs :
  T extends "like" ? Prisma.LikeFindUniqueArgs :
  T extends "admin" ? Prisma.AdminFindUniqueArgs :
  never;

export type FindManyArgs<T extends ModelType> = 
  T extends "user" ? Prisma.UserFindManyArgs :
  T extends "dog" ? Prisma.DogFindManyArgs :
  T extends "like" ? Prisma.LikeFindManyArgs :
  T extends "admin" ? Prisma.AdminFindManyArgs :
  never;

export type UpdateArgs<T extends ModelType> = 
  T extends "user" ? Prisma.UserUpdateArgs :
  T extends "dog" ? Prisma.DogUpdateArgs :
  T extends "like" ? Prisma.LikeUpdateArgs :
  T extends "admin" ? Prisma.AdminUpdateArgs :
  never;

export type UpsertArgs<T extends ModelType> = 
  T extends "user" ? Prisma.UserUpsertArgs :
  T extends "dog" ? Prisma.DogUpsertArgs :
  T extends "like" ? Prisma.LikeUpsertArgs :
  T extends "admin" ? Prisma.AdminUpsertArgs :
  never;