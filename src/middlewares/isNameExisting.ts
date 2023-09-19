import { Request, Response, NextFunction } from 'express'
import { Products } from '../interfaces'
import { market } from '../database'

export const isNameExisting = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as Products
  const errorsMiddlewares: { message: string }[] = []

  const isNameDuplicate = market.some((prod) => prod.name === name)

  isNameDuplicate ? errorsMiddlewares.push({ message: 'Product already registered' }) : null

  return errorsMiddlewares.length > 0 ? res.status(409).json(errorsMiddlewares) : next()
}