import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
},{
	timestamps: true,
})

const Product = mongoose.model("Product", productSchema);
// name ("Product") has to be capitalize and singular for mongodb to handle

export default Product;
