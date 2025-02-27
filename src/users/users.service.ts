import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.usuario.findMany();
  }

  async createUser(email: string, senha: string) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    return this.prisma.usuario.create({
      data: { email, senha: hashedPassword },
    });
  }
}
