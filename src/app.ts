import express from "express"
const app = express();
import { createProduct } from "./logic";
app.use(express.json())
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

app.post("/products", createProduct)