import '@emotion/react'

declare module '@emotion/react' {
	export interface Theme {
		colors: {
			primary: string
			secondary: string
			tertiary: string
			info: string
			gray: string
			aqua: string
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
		fontWeight: {
			light: number
			normal: number
			medium: number
			semibold: number
			bold: number
		}
		spacing: {
			0: string
			1: string
			2: string
			3: string
			4: string
			5: string
			6: string
			7: string
			8: string
			9: string
			10: string
			11: string
			12: string
		}
		rounded: {
			md: string
			lg: string
			xl: string
			full: string
		}
	}
}
