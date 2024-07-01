import express, { Request, Response } from "express";
import { CatalogService } from "../service/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductDto } from "./dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post("/products", async (req: Request, res: Response) => {
  try {
    const { errors } = await RequestValidator(CreateProductDto, req.body);
    if (errors) {
      return res.status(400).json(errors);
    }

    const data = await catalogService.createProduct(req.body);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json((error as Error).message);
  }
});

export default router;
