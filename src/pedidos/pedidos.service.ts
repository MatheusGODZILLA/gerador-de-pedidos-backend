import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from 'src/dto/pedidos/create-pedido.dto';
import { UpdatePedidoDto } from 'src/dto/pedidos/update-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    const pedidos = await this.prisma.pedido.findMany({
      where: { usuarioId: userId },
    });
    if (!pedidos.length) {
      throw new NotFoundException(
        'Nenhum pedido encontrado para este usuário.',
      );
    }
    return pedidos;
  }

  async getById(id: number) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { id },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} nao encontrado.`);
    }
    return pedido;
  }

  async create(pedido: CreatePedidoDto, userId: number) {
    const { clienteId, produtos, observacao } = pedido;
    try {
      const produtosIds = produtos.map((item) => item.produtoId);
      const produtosData = await this.prisma.produto.findMany({
        where: { id: { in: produtosIds } },
      });

      let total = produtos.reduce((soma, item) => {
        const produtoEncontrado = produtosData.find(
          (prod) => prod.id === item.produtoId,
        );
        if (!produtoEncontrado) {
          throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
        }
        return soma + produtoEncontrado.preco * item.quantidade;
      }, 0);

      total = parseFloat(total.toFixed(2));

      const novoPedido = await this.prisma.pedido.create({
        data: {
          cliente: { connect: { id: clienteId } },
          total: total,
          observacao: observacao,
          usuario: { connect: { id: userId } },
          produtos: {
            create: produtos.map((item) => ({
              produto: { connect: { id: item.produtoId } },
              quantidade: item.quantidade,
            })),
          },
        },
      });

      return novoPedido;
    } catch (error) {
      throw new Error(`Erro ao criar um novo pedido: ${error.message}`);
    }
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto, userId: number) {
    const { clienteId, produtos, observacao } = updatePedidoDto;

    const produtoIds = produtos.map((item) => item.produtoId);
    const produtosData = await this.prisma.produto.findMany({
      where: { id: { in: produtoIds }, usuarioId: userId },
    });

    let total = produtos.reduce((soma, item) => {
      const produtoEncontrado = produtosData.find(
        (prod) => prod.id === item.produtoId,
      );
      if (!produtoEncontrado) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
      }
      return soma + produtoEncontrado.preco * item.quantidade;
    }, 0);

    total = parseFloat(total.toFixed(2));

    const pedidoAtualizado = await this.prisma.pedido.update({
      where: { id },
      data: {
        cliente: { connect: { id: clienteId } },
        total,
        observacao,
        produtos: {
          deleteMany: {},
          create: produtos.map((item) => ({
            produto: { connect: { id: item.produtoId } },
            quantidade: item.quantidade,
          })),
        },
      },
    });

    return pedidoAtualizado;
  }

  async delete(id: number, userId: number) {
    try {
      const deletedPedido = await this.prisma.pedido.delete({
        where: { id, usuarioId: userId },
      });
      return deletedPedido;
    } catch (error) {
      throw new Error(`Erro ao deletar o pedido: ${error.message}`);
    }
  }
}
