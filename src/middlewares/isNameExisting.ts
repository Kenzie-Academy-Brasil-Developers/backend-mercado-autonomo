import { Request, Response, NextFunction } from 'express'
import { Products } from '../interfaces'
import { market } from '../database'

export const isNameExisting = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as Products;
  const errorsMiddlewares: { message: string }[] = [];

  const isNameMissing = !name;
  const isNameDuplicate = market.some((prod) => prod.name === name);

  isNameMissing ? errorsMiddlewares.push({ message: 'Name is missing in the request body' }) : null;
  isNameDuplicate ? errorsMiddlewares.push({ message: 'Name already exists' }) : null;

  return errorsMiddlewares.length > 0 ? res.status(400).json(errorsMiddlewares) : next();
}