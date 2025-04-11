import express from	'express';
import mongoose from 'mongoose';
import cors from "cors";

import prouductRoute from './routes/product.route.js'

const app = express();
app.use(cors());
app.use(express.json()); // allow parse json

const port = process.env.PORT || 5000;

app.use("/api/products", prouductRoute);

mongoose.connect(process.env.MONGO_URI)
	.then((con)=>{
		console.log(`MongoDB connected: ${con.connection.host}`);
		app.listen(port, ()=>{
			console.log(`Server is listening on port ${port}`);
		});
	}).catch((err)=>{
		console.log(process.env.MONGO_URI);
		console.error(`Error while connecting to MongoDB: ${err.message}`);
		process.exit(1);
	})


