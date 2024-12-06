import { Controller, Get, Param } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get()
  async getAll() {
    return this.produtosService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.produtosService.getById(Number(id));
  }
}
