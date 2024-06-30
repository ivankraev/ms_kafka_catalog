import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {
  constructor(private readonly repo: ICatalogRepository) {}

  createProduct(input: any) {}
  updateProduct(input: any) {}
  getProducts(limit: number, offset: number) {}
  getProduct(id: number) {}
  deleteProduct(id: number) {}
}
