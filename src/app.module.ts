import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ProdutosService } from './produtos/produtos.service';
import { ProdutosController } from './produtos/produtos.controller';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosService } from './pedidos/pedidos.service';
import { PedidosController } from './pedidos/pedidos.controller';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [ProdutosModule, ClientesModule, PedidosModule],
  controllers: [AppController, ProdutosController, PedidosController],
  providers: [AppService, PrismaService, ProdutosService, PedidosService],
})
export class AppModule {}
