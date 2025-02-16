import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from 'src/dto/clientes/create-cliente.dto';
import { UpdateClienteDto } from 'src/dto/clientes/update-cliente.dto';

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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientesService.delete(Number(id));
  }
}
