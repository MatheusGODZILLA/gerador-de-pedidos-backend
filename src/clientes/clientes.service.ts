import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from 'src/dto/clientes/create-cliente.dto';
import { UpdateClienteDto } from 'src/dto/clientes/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    const clientes = await this.prisma.cliente.findMany({
      where: { usuarioId: userId },
      include: { endereco: true },
    });
    if (!clientes.length) {
      throw new NotFoundException(
        'Nenhum cliente encontrado para este usuário.',
      );
    }
    return clientes;
  }

  async getById(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: { endereco: true },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async create(cliente: CreateClienteDto, userId: number) {
    try {
      const novoCliente = await this.prisma.cliente.create({
        data: {
          nome: cliente.nome,
          endereco: {
            create: cliente.endereco,
          },
          telefone: cliente.telefone,
          empresa: cliente.empresa,
          usuario: { connect: { id: userId } },
        },
        include: {
          endereco: true,
        },
      });
      return novoCliente;
    } catch (error) {
      throw new Error(`Erro ao criar um novo cliente: ${error.message}`);
    }
  }

  async update(id: number, cliente: UpdateClienteDto, userId: number) {
    try {
      const clienteAtualizado = await this.prisma.cliente.update({
        where: { id, usuarioId: userId },
        data: {
          nome: cliente.nome,
          endereco: {
            update: cliente.endereco,
          },
          telefone: cliente.telefone,
          empresa: cliente.empresa,
        },
        include: {
          endereco: true,
        },
      });
      return clienteAtualizado;
    } catch (error) {
      throw new Error(`Erro ao atualizar o cliente: ${error.message}`);
    }
  }

  async delete(id: number, userId: number) {
    try {
      const clienteDeletado = await this.prisma.cliente.delete({
        where: { id, usuarioId: userId },
      });
      return clienteDeletado;
    } catch (error) {
      throw new Error(`Erro ao deletar o cliente: ${error.message}`);
    }
  }
}
