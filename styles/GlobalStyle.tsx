import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
	<Global
		styles={[
			css`
				@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;900&display=swap');
			`,
			{
				body: {
					fontFamily: 'Inter',
				},
			},
		]}
	/>
)
