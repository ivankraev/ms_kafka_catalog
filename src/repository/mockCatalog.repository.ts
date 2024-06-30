import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  async create(data: Product): Promise<Product> {
    const mockProduct = {
      id: 123,
      ...data,
    } as Product;

    return mockProduct;
  }
  async update(data: Partial<Product>): Promise<Product> {
    return data as Product;
  }
  async delete(id: number) {
    return { id };
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return [];
  }
  async findOne(id: number): Promise<Product> {
    return { id } as Product;
  }
}
