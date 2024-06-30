import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogService {
  constructor(private readonly repo: ICatalogRepository) {}

  async createProduct(input: Product) {
    const data = await this.repo.create(input);

    if (!data?.id) {
      throw new Error("Unable to create product");
    }

    return data;
  }
  async updateProduct(input: Partial<Product>) {
    const data = await this.repo.update(input);
    // emit event to update event in elasticsearch
    return data;
  }
  async getProducts(limit: number, offset: number) {
    return await this.repo.find(limit, offset);
  }
  async getProduct(id: number) {
    return await this.repo.findOne(id);
  }
  async deleteProduct(id: number) {
    return await this.repo.delete(id);
  }
}
