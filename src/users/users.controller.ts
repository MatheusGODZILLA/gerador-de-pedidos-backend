import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usuarioService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll() {
    return this.usuarioService.getUsers();
  }

  @Post()
  async create(@Body() { email, senha }: { email: string; senha: string }) {
    return this.usuarioService.createUser(email, senha);
  }
}
