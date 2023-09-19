import { Request, Response } from 'express';
import { market } from './database';
import { Products } from './interfaces';

export const createProduct = (req: Request, res: Response) => {
  const bodyProduct = req.body as Products;
  
  if (bodyProduct) {
    const id = Math.random();
    const newProduct: Products = {
      id,
      ...bodyProduct,
    };
    market.push(newProduct);
    console.log(market);
    res.send({ product: market }); // Corrected the typo in the response object
  } else {
    res.sendStatus(400);
  }
};
