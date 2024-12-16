import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from 'dto/clientes/create-cliente.dto';
import { UpdateClienteDto } from 'dto/clientes/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const clientes = await this.prisma.cliente.findMany();
    if (!clientes.length) {
      throw new NotFoundException('Nenhum cliente encontrado.');
    }
    return clientes;
  }

  async getById(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async create(cliente: CreateClienteDto) {
    try {
      const novoCliente = await this.prisma.cliente.create({
        data: {
          nome: cliente.nome,
          endereco: {
            create: cliente.endereco,
          },
          telefone: cliente.telefone,
          empresa: cliente.empresa,
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

  async update(id: number, cliente: UpdateClienteDto) {
    try {
      const clienteAtualizado = await this.prisma.cliente.update({
        where: { id },
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
}
