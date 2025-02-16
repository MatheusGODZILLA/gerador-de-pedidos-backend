import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProdutoDto {
  @IsNotEmpty()
  @IsNumber()
  produtoId: number;

  @IsNotEmpty()
  @IsNumber()
  quantidade: number;
}

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty({ each: true })
  produtos: ProdutoDto[];

  @IsString()
  observacao?: string;
}
