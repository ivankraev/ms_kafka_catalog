import request from "supertest";
import express from "express";

import catalogRoutes, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";
import { faker } from "@faker-js/faker";

const app = express();

app.use(express.json());
app.use(catalogRoutes);

describe("catalogRoutes", () => {
  describe("POST /products", () => {
    test("should create product", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));
      const response = await request(app)
        .post("/products")
        .send(product)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(product);
    });
    test("should respond with validation error 400", async () => {
      const product = ProductFactory.build();

      const response = await request(app)
        .post("/products")
        .send({ ...product, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should respond with 500 if something goes wrong", async () => {
      const product = ProductFactory.build();
      const errorMessage = "Error occured while creating product";
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      const response = await request(app)
        .post("/products")
        .send(product)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe(errorMessage);
    });
  });
  describe("PATCH /products/:id", () => {
    test("should update product", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        stock: product.stock,
        price: product.price,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(product);
    });
    test("should respond with validation error 400", async () => {
      const product = ProductFactory.build();
      const requestBody = {
        name: product.name,
        stock: product.stock,
        price: -1,
      };

      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("price must not be less than 1");
    });

    test("should respond with 500 if something goes wrong", async () => {
      const product = ProductFactory.build();
      const errorMessage = "Error occured while updating product";
      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      const response = await request(app)
        .patch(`/products/${product.id}`)
        .send(product)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe(errorMessage);
    });
  });
  describe("GET /products?limit=0&offset=0", () => {
    test("should return a range of products based on limit and offset", async () => {
      const randomLimit = faker.number.int({ min: 10, max: 50 });
      const products = ProductFactory.buildList(randomLimit);

      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(products));

      const response = await request(app)
        .get(`/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(products);
    });
  });
  describe("GET /products/:id", () => {
    test("should return a specific product by id", async () => {
      const product = ProductFactory.build();

      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await request(app)
        .get(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(product);
    });
  });
  describe("DELETE /products/:id", () => {
    test("should delete a specific product by id", async () => {
      const product = ProductFactory.build();

      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() =>
          Promise.resolve({ id: product.id as number })
        );

      const response = await request(app)
        .delete(`/products/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ id: product.id });
    });
  });
});
