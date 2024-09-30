import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/index.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<App />
					<ReactQueryDevtools
						initialIsOpen={false}
						position="bottom-right"
					/>
				</BrowserRouter>
			</QueryClientProvider>
		</ChakraProvider>
	</StrictMode>
);