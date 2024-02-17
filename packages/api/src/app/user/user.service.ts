import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ take, skip, select }: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany({ take, skip, select });
  }

  async findOne({ where, select }: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique({ where, select });
  }

  async create({ data, select }: Prisma.UserCreateArgs) {
    return await this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
      select,
    });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    select: Prisma.UserSelect
  ) {
    return await this.prisma.user.update({
      where,
      data: {
        ...data,
        password: data.password
          ? await hash(String(data.password), 10)
          : undefined,
      },
      select,
    });
  }

  async delete({
    where,
    select,
  }: {
    where: Prisma.UserWhereUniqueInput;
    select: Prisma.UserSelect;
  }) {
    return await this.prisma.user.delete({ where, select });
  }
}
