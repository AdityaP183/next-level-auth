import {
	Alert,
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Link as ChakraLink,
	AlertIcon,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");

	const {
		mutate: sendPasswordReset,
		isError,
		isSuccess,
		isPending,
		error,
	} = useMutation({
		mutationFn: sendPasswordResetEmail,
	});

	return (
		<Flex minH="100vh" align="center" justify="center">
			<Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
				<Heading fontSize="4xl" mb={8}>
					Reset your password
				</Heading>
				<Box rounded="lg" bg="gray.700" boxShadow="lg" p={8}>
					{isError && (
						<Box mb={3} color="red.400">
							{error.message || "An error occurred"}
						</Box>
					)}
					<Stack spacing={4}>
						{isSuccess ? (
							<Alert status="success" borderRadius={12}>
								<AlertIcon />
								Email sent! Check your inbox for further
								instructions.
							</Alert>
						) : (
							<>
								<FormControl id="email">
									<FormLabel>Email address</FormLabel>
									<Input
										type="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										autoFocus
									/>
								</FormControl>
								<Button
									my={2}
									isLoading={isPending}
									isDisabled={!email}
									onClick={() => sendPasswordReset(email)}
								>
									Reset Password
								</Button>
							</>
						)}
						<Text align="center" fontSize="sm" color="text.muted">
							Go back to{" "}
							<ChakraLink as={Link} to="/login" replace>
								Sign in
							</ChakraLink>
							&nbsp;or&nbsp;
							<ChakraLink as={Link} to="/register" replace>
								Sign up
							</ChakraLink>
						</Text>
					</Stack>
				</Box>
			</Container>
		</Flex>
	);
}
