import { Product } from "../models/product.model";

export interface ICatalogRepository {
  create(data: Product): Promise<Product>;
  update(data: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<{ id: number }>;
  find(limit: number, offset: number): Promise<Product[]>;
  findOne(id: number): Promise<Product>;
}
