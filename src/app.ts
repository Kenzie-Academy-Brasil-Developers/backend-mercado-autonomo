import express from 'express'
const app = express()
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from './logic'
import { isNameExisting } from './middlewares/isNameExisting'
app.use(express.json())
const port = 3000

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
})
app.get('/products', getProducts)
app.get('/products/:id', getProductById)
app.post('/products', isNameExisting, createProduct)
app.patch('/products/:id', isNameExisting, updateProductById)

app.delete("/products/:id", deleteProductById)
