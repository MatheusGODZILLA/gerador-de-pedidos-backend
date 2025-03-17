import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!user.senha) {
      throw new UnauthorizedException('Senha não cadastrada para este usuário');
    }

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return { id: user.id, email: user.email };
  }

  async login(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
