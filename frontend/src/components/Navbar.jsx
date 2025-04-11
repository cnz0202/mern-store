import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoAdd, IoMoon, IoSunny } from "react-icons/io5";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Container
			maxW={"100vw"}
			px={4}
			bg={useColorModeValue("blackAlpha.100", "blackAlpha.300")}
		>
			<Flex
				h={16}
				alignContent={"center"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Text
					bgGradient="linear(to-r, #FF7F00, #BF00BF)"
					bgClip="text"
					fontSize={{ base: 22, sm: 28 }}
					fontWeight="bold"
					textAlign={"center"}
				>
					<Link to={"/"}>{"MERN Store :)"}</Link>
				</Text>
				<HStack spacing={"2"} alignItems={"center"}>
					<Button size={"sm"}>
						<Link to={"/create"}> <IoAdd size={22} /> </Link>
					</Button>
					<Button size={"sm"} onClick={toggleColorMode}>
						{colorMode==="light"?<IoMoon size={22} />:<IoSunny size={22} />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
