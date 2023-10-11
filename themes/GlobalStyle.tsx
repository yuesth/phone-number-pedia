import { Global } from '@emotion/react'

export const GlobalStyles = () => (
	<Global
		styles={[
			{
				'@font-face': {
					fontFamily: 'Inter',
					src: 'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap") format("truetype")',
				},
			},
		]}
	/>
)
