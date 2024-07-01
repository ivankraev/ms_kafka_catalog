import { faker } from "@faker-js/faker";

import { CatalogService } from "../catalog.service";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { ProductFactory } from "../../utils/fixtures";

describe("catalogService", () => {
  let repo: ICatalogRepository;

  beforeEach(() => {
    repo = new MockCatalogRepository();
  });
  afterEach(() => {
    repo = {} as MockCatalogRepository;
  });

  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();
      const res = await service.createProduct(product);

      expect(res).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
    test("should throw error if something goes wrong", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();
      jest
        .spyOn(repo, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(product)).rejects.toThrow(
        "Unable to create product"
      );
    });
    test("should throw error with product that already exist", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();
      jest
        .spyOn(repo, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product already exists"))
        );

      await expect(service.createProduct(product)).rejects.toThrow(
        "Product already exists"
      );
    });
  });
  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();
      const res = await service.updateProduct(product);

      expect(res).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw error with product that already exist", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();
      jest
        .spyOn(repo, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product does not exists"))
        );

      await expect(service.updateProduct(product)).rejects.toThrow(
        "Product does not exists"
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by offset and limit", async () => {
      const service = new CatalogService(repo);
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(repo, "find")
        .mockImplementationOnce(() => Promise.resolve(products));

      const res = await service.getProducts(randomLimit, 0);
      expect(res.length).toEqual(randomLimit);
      expect(res).toMatchObject(products);
    });
  });

  describe("getProduct", () => {
    test("should get specific product", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();

      jest
        .spyOn(repo, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));

      const res = await service.getProduct(product.id as number);
      expect(res).toMatchObject(product);
    });
  });

  describe("deleteProduct", () => {
    test("should delete specific product", async () => {
      const service = new CatalogService(repo);
      const product = ProductFactory.build();

      jest
        .spyOn(repo, "delete")
        .mockImplementationOnce(() =>
          Promise.resolve({ id: product.id as number })
        );

      const res = await service.deleteProduct(product.id as number);
      expect(res.id).toEqual(product.id);
    });
  });
});
