import { IsString, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  preco: number;

  @IsString()
  tag: string;
}
