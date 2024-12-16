import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from 'dto/clientes/create-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get()
  async getAll() {
    return this.clientesService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.clientesService.getById(Number(id));
  }

  @Post()
  async create(@Body() cliente: CreateClienteDto) {
    return this.clientesService.create(cliente);
  }
}
