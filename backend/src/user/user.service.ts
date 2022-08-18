import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginProps } from './user.controller';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async findByEmailAndPassword(data: LoginProps) {
    return this.prismaService.user.findFirst({
      where: { ...data },
    });
  }
}
