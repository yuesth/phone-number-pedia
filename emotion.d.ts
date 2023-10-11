import '@emotion/react'

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			primary: string
			secondary: string
			tertiary: string
			tone: {
				negative: string
				positive: string
			}
		}
		fontSize: {
			xs: string
			sm: string
			base: string
			lg: string
			xl: string
			'2xl': string
			'3xl': string
			'4xl': string
			'5xl': string
		}
	}
}
