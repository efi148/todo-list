import { IsBoolean, IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly checked: boolean;
}