import request from "supertest";
import express from "express";

import catalogRoutes, { catalogService } from "../catalog.routes";
import { ProductFactory } from "../../utils/fixtures";

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
});
