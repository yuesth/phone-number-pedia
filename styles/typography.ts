import { mq } from '@/utils/common'
import { CSSInterpolation } from '@emotion/css'
import { Theme, css } from '@emotion/react'
import { marginVertical } from './common'

export const titleMain = (theme: Theme, ...obj: CSSInterpolation[]) => {
	return css(
		mq({
			fontSize: [theme.fontSize.xl, theme.fontSize['3xl']],
			fontWeight: theme.fontWeight.bold,
		}),
		marginVertical(theme, 2),
		obj
	)
}

export const title1 = (theme: Theme, ...obj: CSSInterpolation[]) => {
	return css(
		mq({
			fontSize: [theme.fontSize.base, theme.fontSize.lg],
			fontWeight: theme.fontWeight.semibold,
		}),
		marginVertical(theme, 2),
		obj
	)
}

export const body = (theme: Theme, ...obj: CSSInterpolation[]) => {
	return css(
		mq({
			fontSize: [theme.fontSize.xs, theme.fontSize.sm],
			fontWeight: theme.fontWeight.normal,
		}),
		marginVertical(theme, 2),
		obj
	)
}

export const label = (theme: Theme, ...obj: CSSInterpolation[]) => {
	return css(
		mq({
			fontSize: [theme.fontSize.xs, theme.fontSize.sm],
			fontWeight: theme.fontWeight.light,
			color: theme.colors.secondary,
		}),
		marginVertical(theme, 2),
		obj
	)
}
