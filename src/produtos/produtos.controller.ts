import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from 'dto/produtos/create-produto.dto';
import { UpdateProdutoDto } from 'dto/produtos/update-produto.dto';

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() produto: UpdateProdutoDto) {
    return this.produtosService.update(Number(id), produto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.produtosService.delete(Number(id));
  }
}
