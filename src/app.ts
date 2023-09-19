import express from 'express'
const app = express()
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById
} from './logic'
import { isNameExisting } from './middlewares/isNameExisting'
import { isIdExisting } from './middlewares/isIdExisting'
app.use(express.json())
const port = 3000

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
})

// GET
app.get('/products', getProducts)
app.get('/products/:id', isIdExisting, getProductById)

// POST
app.post('/products', isNameExisting, createProduct)

// PATCH
app.patch('/products/:id', isIdExisting, isNameExisting, updateProductById)

// DELETE
app.delete('/products/:id', isIdExisting, deleteProductById)