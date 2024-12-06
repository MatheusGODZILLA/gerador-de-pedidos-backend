import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Gerador de Pedidos com NestJS e Prisma!';
  }
}
