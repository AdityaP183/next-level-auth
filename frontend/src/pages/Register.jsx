import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";
import {
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Link as ChakraLink,
	Button,
	Text,
	Box,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();

	const {
		mutate: createAccount,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: register,
		onSuccess: () => {
			navigate("/login", { replace: true });
		},
	});
	return (
		<Flex minH="100vh" align="center" justify="center">
			<Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
				<Heading fontSize="4xl" mb={8}>
					Create an account
				</Heading>
				<Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
					{isError && (
						<Box mb={3} color="red.500">
							{error?.message ||
								"An error occurred. Please try again."}
						</Box>
					)}
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email:</FormLabel>
							<Input
								type="email"
								autoFocus
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password:</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<FormControl id="confirm-password">
							<FormLabel>Confirm Password:</FormLabel>
							<Input
								type="confirm-password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								onKeyDown={(e) =>
									e.key === "Enter" &&
									createAccount({
										email,
										password,
										confirmPassword,
									})
								}
							/>
						</FormControl>

						<Button
							my={2}
							isDisabled={!email || password.length < 6}
							onClick={() =>
								createAccount({
									email,
									password,
									confirmPassword,
								})
							}
							isLoading={isPending}
						>
							Sign In
						</Button>
						<Text align="center" fontSize="sm" color="text.muted">
							Already a user?{" "}
							<ChakraLink as={Link} to="/login">
								Sign In
							</ChakraLink>
						</Text>
					</Stack>
				</Box>
			</Container>
		</Flex>
	);
}
