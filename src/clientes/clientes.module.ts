import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ClientesService, PrismaService],
  controllers: [ClientesController],
})
export class ClientesModule {}
