import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from 'src/dto/produtos/create-produto.dto';
import { UpdateProdutoDto } from 'src/dto/produtos/update-produto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(@Request() req) {
    return this.produtosService.getAll(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.produtosService.getById(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() produto: CreateProdutoDto, @Request() req) {
    return this.produtosService.create(produto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() produto: UpdateProdutoDto,
    @Request() req,
  ) {
    return this.produtosService.update(Number(id), produto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.produtosService.delete(Number(id), req.user.userId);
  }
}
