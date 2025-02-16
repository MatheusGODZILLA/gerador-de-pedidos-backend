import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from 'dto/pedidos/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @Get()
  async getAll() {
    return this.pedidosService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.pedidosService.getById(Number(id));
  }

  @Post()
  async create(@Body() pedido: CreatePedidoDto) {
    return this.pedidosService.create(pedido);
  }
}
