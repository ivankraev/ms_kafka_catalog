import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @Min(1)
  price: number;
  @IsNumber()
  stock: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  @Min(1)
  price?: number;
  stock?: number;
}
