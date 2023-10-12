import { mq } from '@/utils/common'
import { Theme, css } from '@emotion/react'

export const paddingVertical = (theme: Theme, spacing: number) => {
	return css(
		mq({
			//@ts-ignore
			paddingTop: theme.spacing[spacing],
			//@ts-ignore
			paddingBottom: theme.spacing[spacing],
		})
	)
}

export const paddingHorizontal = (theme: Theme, spacing: number) => {
	return css(
		mq({
			//@ts-ignore
			paddingLeft: theme.spacing[spacing],
			//@ts-ignore
			paddingRight: theme.spacing[spacing],
		})
	)
}

export const marginHorizontal = (theme: Theme, spacing: number) => {
	return css(
		mq({
			//@ts-ignore
			marginLeft: theme.spacing[spacing],
			//@ts-ignore
			marginRight: theme.spacing[spacing],
		})
	)
}

export const marginVertical = (theme: Theme, spacing: number) => {
	return css(
		mq({
			//@ts-ignore
			marginTop: theme.spacing[spacing],
			//@ts-ignore
			marginBottom: theme.spacing[spacing],
		})
	)
}

export const marginHorizontalAuto = () => {
	return css(
		mq({
			marginLeft: 'auto',
			marginRight: 'auto',
		})
	)
}

export const marginVerticalAuto = () => {
	return css(
		mq({
			marginTop: 'auto',
			marginBottom: 'auto',
		})
	)
}
