import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post("/product", (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({});
});

export default router;
