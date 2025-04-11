import {
	Container,
	Heading,
	SimpleGrid,
	Text,
	VStack,
	Spinner,
    Flex,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const HomePage = () => {
	const { getProduct, products } = useProductStore();
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		setLoading(true);
		getProduct()
			.then(_=>{
				setLoading(false);
			}).catch((err)=>{
				console.error(err);
				setLoading(false);
			});
	}, [getProduct]);
	return (
		<Container maxW={"container.lg"}>
			<VStack spacing={8}>
				<Heading
					size={"2xl"}
					textAlign={"center"}
				>
					<Text>{"Products"}</Text>
				</Heading>
				<SimpleGrid
					columns={{
						base: 1,
						sm: 2,
						lg: 3,
					}}
					spacing={4}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard
							key={product._id}
							product={product}
						/>
					))}
				</SimpleGrid>
			</VStack>
			{products.length === 0 &&
				(loading ? (
					<Flex w={"full"} justifyContent="center">
						<Spinner size={"lg"}/>
					</Flex>
				) : (
					<Text textAlign={"center"}>
						{"No products found "}
						<Link to={"/create"}>
							<Text
								as="span"
								color={"blue.500"}
								_hover={{ textDecoration: "underline" }}
							>
								{"create product"}
							</Text>
						</Link>
					</Text>
					)
				)
			}
		</Container>
	);
};

export default HomePage;
