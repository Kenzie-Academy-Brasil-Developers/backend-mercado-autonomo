import { Request, Response } from 'express';
import { market } from './database';
import { Products } from './interfaces';

let nextId = 1;

export const createProduct = (req: Request, res: Response) => {
  try {
    const bodyProduct = req.body as Products;

    if (!bodyProduct) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const currentDate = new Date();
    const oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(currentDate.getFullYear() + 1);

    const newProduct: Products = {
      id: nextId++,
      ...bodyProduct,
      expirationDate: oneYearLater
    };

    market.push(newProduct);
    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProducts = (req: Request, res: Response) => {
  try {
    const totalValue = market.reduce((total, product) => total + (product?.price ?? 0), 0);

    return res.status(200).json({ total: totalValue, products: market });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getProductById = (req: Request, res: Response) => {
  try {
    const productId: number = Number(req.params.id);
    const product = market.find((prod) => prod.id === productId);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

export const updateProductById = (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const productIndex = market.findIndex((prod) => prod.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const product = { ...market[productIndex], ...req.body };
    market[productIndex] = product;

    return res.status(200).json({ ...product });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteProductById = (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    const productIndex = market.findIndex((prod) => prod.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    market.splice(productIndex, 1);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
