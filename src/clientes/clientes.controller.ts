import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from 'src/dto/clientes/create-cliente.dto';
import { UpdateClienteDto } from 'src/dto/clientes/update-cliente.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req) {
    return this.clientesService.getAll(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.clientesService.getById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() cliente: CreateClienteDto, @Request() req) {
    return this.clientesService.create(cliente, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() cliente: UpdateClienteDto,
    @Request() req,
  ) {
    return this.clientesService.update(Number(id), cliente, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.clientesService.delete(Number(id), req.user.userId);
  }
}
