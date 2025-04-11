import React, { useState } from "react";
import { useProductStore } from "../store/product";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useToast,
    VStack,
    Input,
    Button,
} from '@chakra-ui/react'

const EditCard = ({ product, isOpen, onClose }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { updateProduct } = useProductStore();
	const toast = useToast();
	const handleUpdateProduct = async () => {
		await updateProduct(product._id, updatedProduct)
			.then((res) => {
				toast({
					title: "Success",
					description: res.message,
					status: "success",
				});
				onClose();
			}).catch((res) => {
				toast({
					title: "Error",
					description: res.message,
					status: "error",
				});
			});
	}
	const onCloseReset = () => {
		onClose();
		setUpdatedProduct(product);
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onCloseReset}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit product</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack spacing={4}>
						<Input
							placeholder={"name"}
							name={"name"}
							value={updatedProduct.name}
							onChange={(e) => {
								setUpdatedProduct({ ...updatedProduct, name: e.target.value });
							}}
						/>
						<Input
							placeholder={"price"}
							name={"price"}
							isInvalid={isNaN(updatedProduct.price)}
							value={updatedProduct.price}
							onChange={(e) => {
								setUpdatedProduct({ ...updatedProduct, price: e.target.value });
							}}
						/>
						<Input
							placeholder={"image"}
							name={"image"}
							value={updatedProduct.image}
							onChange={(e) => {
								setUpdatedProduct({ ...updatedProduct, image: e.target.value });
							}}
						/>
					</VStack>
				</ModalBody>

				<ModalFooter gap={2}>
					<Button
						colorScheme="blue"
						onClick={handleUpdateProduct}
					>
						{"Confirm"}
					</Button>
					<Button
						variant={"ghost"}
						onClick={onCloseReset}
					>
						{"Cancel"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditCard;
