import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const createProduct = async (req,res)=>{
	const product = req.body;
	if (!product.name||!product.price||!product.image) {
		return res.status(400).json({ success: false, message: "Missing field" })
	}
	if (isNaN(product.price)) {
		return res.status(400).json({ success: false, message: "Invalid price" })
	}

	try {
		const createdProduct = await Product.create(product);
		res.status(201).json({ success: true, data: createdProduct, message: "Product created"})
	} catch (error) {
		console.error(`Error while creating product: ${error.message}`);
		res.status(500).json({ success: false, message: "Server error" });
	}
}

export const getProduct = async (req,res)=>{
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error(`Error while fetching products: ${error.message}`)
		res.status(500).json({ success: false, message: "Server error" })
	}
}

export const updateProduct = async (req,res)=>{
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Product not found" });
	}
	const product = req.body;
	if (!product.name||!product.price||!product.image) {
		return res.status(400).json({ success: false, message: "Missing field" })
	}
	if (isNaN(product.price)) {
		return res.status(400).json({ success: false, message: "Invalid price" })
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
		res.status(200).json({ success: true, data: updatedProduct, message: "Product updated"});
	} catch (error) {
		console.error(`Error while updating products: ${error.message}`)
		res.status(500).json({ success: false, message: "Server error" })
	}
}

export const deleteProduct = async (req,res)=>{
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Product not found" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.error(`Error while deleting products: ${error.message}`)
		res.status(500).json({ success: false, message: "Server error" })
	}
}
