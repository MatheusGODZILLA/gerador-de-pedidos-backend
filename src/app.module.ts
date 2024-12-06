import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProdutosService } from './produtos/produtos.service';
import { ProdutosController } from './produtos/produtos.controller';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [ProdutosModule],
  controllers: [AppController, ProdutosController],
  providers: [AppService, PrismaService, ProdutosService],
})
export class AppModule {}
