import { create } from "zustand";

const api = import.meta.env.VITE_API_URL;
export const useProductStore = create((set)=>({
	products: [],
	setProducts: (products)=>set({products}),

	createProduct: async (newProduct)=>{
		if (!newProduct.name||!newProduct.price||!newProduct.image) {
			return Promise.reject({ message: "Missing Fields" });
		}
		if (isNaN(newProduct.price)) {
			return Promise.reject({ message: "Invalid price" });
		}

		return await fetch(`${api}/products`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newProduct)
		})  .then(res=>res.json())
			.then((res)=>{
				if (!res.success) return Promise.reject(res);
				set((state)=>({ products: [...state.products, res.data] }));
				return res;
			});
	},
	getProduct: async ()=>{
		return await fetch(`${api}/products`)
			.then(res=>res.json())
			.then((res)=>{
				if (!res.success) return Promise.reject(res);
				set({ products: res.data });
				return Promise.resolve(res);
			});
	},
	deleteProduct: async (id)=>{
		return await fetch(`${api}/products/${id}`, {
			method: "DELETE"
		})  .then(res=>res.json())
			.then((res)=>{
				if (!res.success) return Promise.reject(res);
				set((state)=>({ products: state.products.filter((p)=>p._id!==id) }));
				return res;
			});
		
	},
	updateProduct: async (id, updatedProduct)=>{
		if (!updatedProduct.name||!updatedProduct.price||!updatedProduct.image) {
			return Promise.reject({ message: "Missing Fields" });
		}
		if (isNaN(updatedProduct.price)) {
			return Promise.reject({ message: "Invalid price" });
		}

		return await fetch(`${api}/products/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedProduct)
		})  .then(res=>res.json())
			.then((res)=>{
				if (!res.success) return Promise.reject(res);
				set((state)=>({products: state.products.map((p)=>p._id==id?res.data:p)}));
				return res;
			});
	},
}));
