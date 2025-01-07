import { Request, Response, NextFunction } from "express";

export const validateAnimal = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id, name, price, kind, age } = req.body;
  if (!id || !name || !price || !kind || !age) {
    res.status(400).send("All fields are required.");
    return;
  }
  next();
};
