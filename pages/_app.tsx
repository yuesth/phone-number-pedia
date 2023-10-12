import '@/styles/globals.css'
import { GlobalStyles } from '@/styles/GlobalStyle'
import { baseTheme } from '@/themes/base'
import { ThemeProvider } from '@emotion/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={baseTheme}>
			<GlobalStyles />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
