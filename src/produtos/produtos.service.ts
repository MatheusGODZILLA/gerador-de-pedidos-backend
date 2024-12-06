import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from 'dto/produtos/create-produto.dto';
import { UpdateProdutoDto } from 'dto/produtos/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const produtos = await this.prisma.produto.findMany();
    if (!produtos.length) {
      throw new NotFoundException('Nenhum produto encontrado.');
    }
    return produtos;
  }

  async getById(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }
    return produto;
  }

  async create(produto: CreateProdutoDto) {
    try {
      const novoProduto = await this.prisma.produto.create({
        data: produto,
      });
      return novoProduto;
    } catch (error) {
      throw new Error(`Erro ao criar um novo produto: ${error.message}`);
    }
  }

  async update(id: number, produto: UpdateProdutoDto) {
    try {
      const produtoAtualizado = await this.prisma.produto.update({
        where: { id },
        data: produto,
      });
      return produtoAtualizado;
    } catch (error) {
      throw new Error(`
        Erro ao atualizar o produto com ID ${id}: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      const produtoDeletado = await this.prisma.produto.delete({
        where: { id },
      });
      return produtoDeletado;
    } catch (error) {
      throw new Error(`
        Erro ao deletar o produto com ID ${id}: ${error.message}`);
    }
  }
}
