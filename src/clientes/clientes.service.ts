import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
