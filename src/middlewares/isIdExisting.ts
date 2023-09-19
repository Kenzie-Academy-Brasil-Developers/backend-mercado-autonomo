import { Request, Response, NextFunction } from 'express'
import { market } from '../database'

const isIdExisting = (req: Request, res: Response, next: NextFunction) => {
  const errorsMiddlewares: { message: string }[] = []
  const id = req.params.id
  const isIdMissing = !id

  const IdExisting = market.some((prod) => prod.id === id)

  isIdMissing ? errorsMiddlewares.push({ message: 'Id is missing in the request body' }) : null
  IdExisting ? errorsMiddlewares.push({ message: 'Id already exists' }) : null
  return errorsMiddlewares.length > 0 ? res.status(400).json(errorsMiddlewares) : next()
}
