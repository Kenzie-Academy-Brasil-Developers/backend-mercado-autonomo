import { Request, Response, NextFunction } from 'express'
import { market } from '../database'
export const isIdExisting = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const IdExisting = market.some((prod) => prod.id === id)
  IdExisting ? res.status(404).send({ message: 'Product not found.' }) : next()
}
