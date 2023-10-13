import { API_URL } from '@/configs/api'
import { ToastProvider } from '@/providers/ToastProvider'
import '@/styles/globals.css'
import { GlobalStyles } from '@/styles/GlobalStyle'
import { baseTheme } from '@/themes/base'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	const client = new ApolloClient({
		uri: API_URL,
		cache: new InMemoryCache(),
	})

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={baseTheme}>
				<ToastProvider>
					<GlobalStyles />
					<Component {...pageProps} />
				</ToastProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}
