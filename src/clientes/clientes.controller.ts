import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from 'dto/clientes/create-cliente.dto';
import { UpdateClienteDto } from 'dto/clientes/update-cliente.dto';

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() cliente: UpdateClienteDto) {
    return this.clientesService.update(Number(id), cliente);
  }
}
