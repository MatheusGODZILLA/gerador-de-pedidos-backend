import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from 'src/dto/produtos/create-produto.dto';
import { UpdateProdutoDto } from 'src/dto/produtos/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    const produtos = await this.prisma.produto.findMany({
      where: { usuarioId: userId },
    });
    if (!produtos.length) {
      throw new NotFoundException(
        'Nenhum produto encontrado para este usuário.',
      );
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

  async create(produto: CreateProdutoDto, userId: number) {
    try {
      const novoProduto = await this.prisma.produto.create({
        data: {
          ...produto,
          usuario: { connect: { id: userId } },
        },
      });
      return novoProduto;
    } catch (error) {
      throw new Error(`Erro ao criar um novo produto: ${error.message}`);
    }
  }

  async update(id: number, produto: UpdateProdutoDto, userId: number) {
    try {
      const produtoAtualizado = await this.prisma.produto.update({
        where: { id, usuarioId: userId },
        data: {
          ...produto,
          usuario: { connect: { id: userId } },
        },
      });
      return produtoAtualizado;
    } catch (error) {
      throw new Error(`
        Erro ao atualizar o produto com ID ${id}: ${error.message}`);
    }
  }

  async delete(id: number, userId: number) {
    try {
      const produto = await this.prisma.produto.findUnique({
        where: { id, usuarioId: userId },
      });

      if (!produto || produto.usuarioId !== userId) {
        throw new NotFoundException(
          `Produto com ID ${id} não encontrado ou não pertence ao usuário.`,
        );
      }

      const produtoDeletado = await this.prisma.produto.delete({
        where: {
          id,
          usuarioId: userId,
        },
      });

      return produtoDeletado;
    } catch (error) {
      throw new Error(
        `Erro ao deletar o produto com ID ${id}: ${error.message}`,
      );
    }
  }
}
