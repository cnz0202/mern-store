import {
	Box,
	Flex,
	Heading,
	IconButton,
	Text,
	useToast,
	useDisclosure,
	Image,
} from "@chakra-ui/react";
import { IoTrashSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { useProductStore } from "../store/product";
import EditCard from "./EditCard";

const ProductCard = ({ product }) => {
	const { deleteProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const priceFormat = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const handleDeleteProduct = async () => {
		await deleteProduct(product._id)
			.then((res) => {
				toast({
					title: "Success",
					description: res.message,
					status: "success",
				});
			})
			.catch((res) => {
				toast({
					title: "Error",
					description: res.message,
					status: "error",
				});
			});
	};
	return (
		<>
			<Box
				shadow={"lg"}
				rounded={"lg"}
				overflow={"hidden"}
				transition="all 0.3s"
				_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
				bg={"blackAlpha.200"}
			>
				<Image
					src={product.image}
					alt={product.name}
					h={48}
					w={"full"}
					objectFit={"cover"}
				/>
				<Box p={2}>
					<Heading>{product.name}</Heading>
					<Text>{priceFormat.format(product.price)}</Text>
					<Flex
						w={"full"}
						justify={"right"}
						gap={2}
					>
						<IconButton
							icon={<RiEdit2Fill />}
							size={"xs"}
							bg={"blue.300"}
							onClick={onOpen}
						/>
						<IconButton
							icon={<IoTrashSharp />}
							size={"xs"}
							bg={"red.300"}
							onClick={handleDeleteProduct}
						/>
					</Flex>
				</Box>
			</Box>

			<EditCard
				product={product}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</>
	);
};

export default ProductCard;
