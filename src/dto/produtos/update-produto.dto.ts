import { IsNumber, IsString } from 'class-validator';

export class UpdateProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  preco: number;

  @IsString()
  tag: string;
}
