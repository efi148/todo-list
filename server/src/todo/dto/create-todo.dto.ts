import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsDefined()
  @IsString()
  readonly description: string;
}