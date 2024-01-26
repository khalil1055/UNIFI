import { IsString, IsNumber, Min, IsNotEmpty, IsNotIn, IsOptional, Equals } from 'class-validator';

export class ResponseMissionDto {
  readonly mover_id: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly weight_limit: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  readonly energy: number;

  @Equals("resting")
  @IsOptional()
  readonly quest_state: string;
}