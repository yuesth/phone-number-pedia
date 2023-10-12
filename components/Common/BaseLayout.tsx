import { mq } from '@/utils/common'
import { css, useTheme } from '@emotion/react'
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
				css={css(
					{
						marginLeft: 'auto',
						marginRight: 'auto',
					},
					mq({
						width: [`90%`, `70%`],
					})
				)}
				{...props}
			>
				{children}
			</div>
		</main>
	)
}

export default BaseLayout
