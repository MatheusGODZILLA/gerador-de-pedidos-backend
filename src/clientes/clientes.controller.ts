import { Controller, Get, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service';

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
}
