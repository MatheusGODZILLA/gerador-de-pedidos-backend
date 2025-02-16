import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from 'dto/pedidos/create-pedido.dto';
import { UpdatePedidoDto } from 'dto/pedidos/update-pedido.dto';

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return this.pedidosService.update(Number(id), updatePedidoDto);
  }
}
