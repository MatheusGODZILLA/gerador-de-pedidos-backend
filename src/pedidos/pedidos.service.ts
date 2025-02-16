import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from 'dto/pedidos/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const pedidos = await this.prisma.pedido.findMany();
    if (!pedidos.length) {
      throw new NotFoundException('Nenhum pedido encontrado.');
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

  async create(pedido: CreatePedidoDto) {
    const { clienteId, produtos, observacao } = pedido;
    try {
      const produtosIds = produtos.map((item) => item.produtoId);
      const produtosData = await this.prisma.produto.findMany({
        where: { id: { in: produtosIds } },
      });

      // Calcula o valor total do pedido
      const total = produtos.reduce((soma, item) => {
        const produtoEncontrado = produtosData.find(
          (prod) => prod.id === item.produtoId,
        );
        if (!produtoEncontrado) {
          throw new Error(`Produto com ID ${item.produtoId} não encontrado`);
        }
        return soma + produtoEncontrado.preco * item.quantidade;
      }, 0);

      // Cria o pedido e os itens relacionados (PedidoProduto)
      const novoPedido = await this.prisma.pedido.create({
        data: {
          cliente: { connect: { id: clienteId } },
          total: total,
          observacao: observacao,
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
}
