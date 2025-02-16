import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

@Module({
  providers: [PedidosService, PrismaService],
  controllers: [PedidosController],
})
export class PedidosModule {}
