import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from 'src/dto/pedidos/create-pedido.dto';
import { UpdatePedidoDto } from 'src/dto/pedidos/update-pedido.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req) {
    return this.pedidosService.getAll(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.pedidosService.getById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() pedido: CreatePedidoDto, @Request() req) {
    return this.pedidosService.create(pedido, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
    @Request() req,
  ) {
    return this.pedidosService.update(
      Number(id),
      updatePedidoDto,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.pedidosService.delete(Number(id), req.user.userId);
  }
}
