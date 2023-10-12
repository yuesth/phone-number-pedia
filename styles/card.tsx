import { mq } from '@/utils/common'
import { CSSInterpolation } from '@emotion/css'
import { Theme, css } from '@emotion/react'
import { paddingHorizontal, paddingVertical } from './common'

export const card = (theme: Theme, ...obj: CSSInterpolation[]) => {
	return css(
		{
			flexDirection: `row`,
			alignItems: 'center',
			justifyContent: 'space-between',
			borderRadius: theme.rounded.xl,
			border: `1px solid ${theme.colors.gray}`,
			backgroundColor: theme.colors.primary,
			color: 'white',
			display: 'flex',
		},
		paddingHorizontal(theme, 4),
		paddingVertical(theme, 3),
		obj
	)
}

export const buttonCard = (...obj: CSSInterpolation[]) => {
	return css(
		mq({
			flexDirection: ['column', 'row'],
		}),
		{
			display: 'flex',
			alignItems: 'center',
		},
		obj
	)
}
