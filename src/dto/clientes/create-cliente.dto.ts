import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from './create-endereco.dto';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  empresa?: string;
}
