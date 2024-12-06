import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from 'dto/create-produto.dto';

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

  @Post()
  async create(@Body() produto: CreateProdutoDto) {
    return this.produtosService.create(produto);
  }
}
