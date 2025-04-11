import {
	Button,
	Container,
	Heading,
	Input,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [product, setProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleCreateProduct = async () => {
		setLoading(true);
		await createProduct(product)
			.then((res)=>{
				setLoading(false);
				toast({
					title: "Success",
					description: res.message,
					status: "success"
				});
				setProduct({name:"",price:"",image:""});
			}).catch((res)=>{
				setLoading(false);
				toast({
					title: "Error",
					description: res.message,
					status: "error",
				});
			});
	}

	return (
		<Container
			maxW={"container.lg"}
		>
			<VStack
				spacing={8}
			>
				<Heading
					size={"2xl"}
					textAlign={"center"}
				>
					<Text>{"Create product"}</Text>
				</Heading>
				<VStack spacing={4}>
					<Input
						placeholder={"name"}
						name={"name"}
						value={product.name}
						onChange={(e) => {
							setProduct({ ...product, name: e.target.value });
						}}
					/>
					<Input
						placeholder={"price"}
						name={"price"}
						isInvalid={isNaN(product.price)}
						value={product.price}
						onChange={(e) => {
							setProduct({ ...product, price: e.target.value });
						}}
					/>
					<Input
						placeholder={"image"}
						name={"image"}
						value={product.image}
						onChange={(e) => {
							setProduct({ ...product, image: e.target.value });
						}}
					/>
					<Button
						isLoading={loading}
						w={"full"}
						colorScheme={"blue"}
						onClick={handleCreateProduct}
					>{"create"}</Button>
				</VStack>
			</VStack>
		</Container>
	);
};

export default CreatePage;
