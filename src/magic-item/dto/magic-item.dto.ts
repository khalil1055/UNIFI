import { IsString, IsNumber, Min, IsNotEmpty, IsNotIn, IsOptional, Equals } from 'class-validator';

export class CreateMagicItemDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly weight: number;

  }
