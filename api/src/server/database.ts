import type { ModelType, ModelTypeData, CreateArgs, DeleteArgs, FindManyArgs, FindUniqueArgs, UpdateArgs, UpsertArgs } from "../types/DatabaseTypes";
import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export class Database {
  private static _instance: Database;
  private prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
  
  constructor() {
    this.prisma = new PrismaClient();
  }
  public get instance(): Database {
    if (!Database._instance) {
      Database._instance = new Database();
    }
    return Database._instance;
  }

  public async create<T extends ModelType>(model: T, args: CreateArgs<T>): Promise<ModelTypeData<T>>{
    return await (this.prisma[model] as any).create(args);
  }  
  
  public async delete<T extends ModelType>(model: T, where: DeleteArgs<T>): Promise<ModelTypeData<T>> {
    return await (this.prisma[model] as any).delete(where);
  }

  public async findUnique<T extends ModelType>(model: T, args: FindUniqueArgs<T>): Promise<ModelTypeData<T>> {
    return await (this.prisma[model] as any).findUnique(args);
  }

  public async findMany<T extends ModelType>(model: T, args?: FindManyArgs<T>): Promise<ModelTypeData<T>[]> {
    return await (this.prisma[model] as any).findMany(args);
  }

  public async update<T extends ModelType>(model: T, args: UpdateArgs<T>): Promise<ModelTypeData<T>> {
    return await (this.prisma[model] as any).update(args);
  }

  public async upsert<T extends ModelType>(model: T, args: UpsertArgs<T>): Promise<ModelTypeData<T>> {
    return await (this.prisma[model] as any).upsert(args);
  }
}