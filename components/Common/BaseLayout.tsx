import { useTheme } from '@emotion/react'
import React from 'react'

interface BaseLayoutProps {
	children: React.ReactNode
}

const BaseLayout = ({ children, ...props }: BaseLayoutProps) => {
	const theme = useTheme()
	return (
		<main
			css={{
				backgroundColor: theme.colors.primary,
				color: theme.colors.secondary,
				maxWidth: `2560px`,
				minHeight: `100vh`,
			}}
		>
			<div
				css={{
					marginLeft: 'auto',
					marginRight: 'auto',
					width: `70%`,
				}}
				{...props}
			>
				{children}
			</div>
		</main>
	)
}

export default BaseLayout
