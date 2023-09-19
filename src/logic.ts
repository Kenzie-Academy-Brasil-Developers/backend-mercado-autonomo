import { Request, Response } from 'express'
import { market } from './database'
import { Products } from './interfaces'

let nextId = 1

export const createProduct = (req: Request, res: Response) => {
  try {
    const bodyProduct = req.body as Products

    if (!bodyProduct) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const currentDate = new Date()
    const oneYearLater = new Date(currentDate)
    oneYearLater.setFullYear(currentDate.getFullYear() + 1)

    const newProduct: Products = {
      id: nextId++,
      ...bodyProduct,
      expirationData: oneYearLater
    }

    market.push(newProduct)

    return res.status(201).json({ product: newProduct })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getProducts = (req: Request, res: Response) => {
  try {
    const listProducts = market
    const totalValue = listProducts.reduce((total, product) => total + product.price, 0)

    return listProducts.length
      ? res.status(200).json({ total: totalValue, products: listProducts })
      : res.status(404).json({ error: 'No products found' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getProductById = (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    const product = market.find((prod) => prod.id == productId)

    return product
      ? res.status(200).json({ product })
      : res.status(404).json({ error: 'Product not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateProductById = (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    const productIndex = market.findIndex((prod) => prod.id == productId)

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const updatedProduct = { ...market[productIndex], ...req.body }
    market[productIndex] = updatedProduct

    return res.status(200).json({ product: updatedProduct })
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteProductById = (req: Request, res: Response) => {
  try {
    const productId = req.params.id
    const productIndex = market.findIndex((prod) => prod.id == productId)

    return productIndex === -1
      ? res.status(404).json({ error: 'Product not found' })
      : (market.splice(productIndex, 1), res.status(204).send())
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
