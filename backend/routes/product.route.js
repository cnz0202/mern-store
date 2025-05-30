import express from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
