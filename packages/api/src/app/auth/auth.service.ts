import { compare, hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "@/app/user/user.dto";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async logIn(username: string, pass: string): Promise<any> {
    const user = await this.findOne({ where: { username } });
    const match = await compare(pass, user.password);

    if (!match) {
      return false;
    }

    const payload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register({
    data,
    select,
  }: {
    data: CreateUserDto;
    select: Prisma.UserSelect;
  }) {
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          password: await hash(data.password, 10),
        },
        select,
      });
    } catch (e) {}
  }

  async findOne({ where, select }: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique({ where, select });
  }
}
