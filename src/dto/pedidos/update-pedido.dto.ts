import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProdutoDto {
  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantidade: number;
}

export class UpdatePedidoDto {
  @IsNumber()
  clienteId: number;

  @IsNotEmpty({ each: true })
  produtos: ProdutoDto[];

  @IsString()
  observacao?: string;
}
