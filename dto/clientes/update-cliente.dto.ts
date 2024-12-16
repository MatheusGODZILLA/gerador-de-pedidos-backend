import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateEnderecoDto } from './update-endereco.dto';

export class UpdateClienteDto {
  @IsString()
  nome: string;

  @ValidateNested()
  @Type(() => UpdateEnderecoDto)
  endereco: UpdateEnderecoDto;

  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  empresa?: string;
}
