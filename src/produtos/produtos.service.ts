import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
