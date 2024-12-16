import { IsString } from 'class-validator';

export class UpdateEnderecoDto {
  @IsString()
  rua: string;

  @IsString()
  numero: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  cep: string;
}
