import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProdutosService, PrismaService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}
