import { Request, Response, NextFunction } from 'express'
import { Products } from '../interfaces'
import { market } from '../database'

export const isNameExisting = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as Products

  const isNameDuplicate = market.some((prod) => prod.name === name)

  if (isNameDuplicate) {
    return res.status(409).json({ message: 'Product already registered.' })
  }
  next()
}
