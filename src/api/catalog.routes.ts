import express, { Request, Response } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.get("/products", async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query["limit"]) || 10;
    const offset = Number(req.query["offset"]) || 0;

    const data = await catalogService.getProducts(limit, offset);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) || 0;

    const data = await catalogService.getProduct(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
});

router.post("/products", async (req: Request, res: Response) => {
  try {
    const { errors, input } = await RequestValidator(
      CreateProductDto,
      req.body
    );
    if (errors) {
      return res.status(400).json(errors);
    }

    const data = await catalogService.createProduct(input);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
});

router.patch("/products/:id", async (req: Request, res: Response) => {
  try {
    const { errors, input } = await RequestValidator(
      UpdateProductDto,
      req.body
    );
    if (errors) {
      return res.status(400).json(errors);
    }

    const id = parseInt(req.params.id) || 0;

    const data = await catalogService.updateProduct({ ...input, id });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
});

router.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) || 0;

    const data = await catalogService.deleteProduct(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
});

export default router;
