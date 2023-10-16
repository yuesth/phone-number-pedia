import { ButtonProps } from '@/interfaces/button'
import { mq } from '@/utils/common'
import { useTheme, css } from '@emotion/react'
import IconLoading from '../Svg/IconLoading'

const Button = ({
	color,
	children,
	onClick,
	size = 'md',
	isDisabled = false,
	isFullWidth = false,
	isLoading = false,
	className,
	style,
	type,
}: ButtonProps) => {
	const theme = useTheme()

	const getColorStyle = () => {
		switch (color) {
			case 'primary':
				return css({ backgroundColor: theme.colors.aqua })
			case 'danger':
				return css({ backgroundColor: theme.colors.tone.negative })
			case 'plain':
				return css({ backgroundColor: theme.colors.tertiary })
			case 'info':
				return css({ backgroundColor: theme.colors.info })
			default:
				return css()
		}
	}
	const getSizeStyle = () => {
		switch (size) {
			case 'lg':
				return css(
					mq({
						paddingLeft: theme.spacing[8],
						paddingRight: theme.spacing[8],
						paddingTop: [theme.spacing[3], theme.spacing[4]],
						paddingBottom: [theme.spacing[3], theme.spacing[4]],
						fontSize: theme.fontSize.base,
						borderRadius: theme.rounded.xl,
					})
				)
			case 'md':
				return css(
					mq({
						paddingLeft: theme.spacing[4],
						paddingRight: theme.spacing[4],
						paddingTop: [theme.spacing[2], theme.spacing[3]],
						paddingBottom: [theme.spacing[2], theme.spacing[3]],
						fontSize: theme.fontSize.base,
						borderRadius: [theme.rounded.lg, theme.rounded.xl],
					})
				)
			case 'sm':
				return css({
					paddingLeft: theme.spacing[3],
					paddingRight: theme.spacing[3],
					paddingTop: theme.spacing[2],
					paddingBottom: theme.spacing[2],
					fontSize: theme.fontSize.base,
					borderRadius: theme.rounded.xl,
				})
			default:
				return css()
		}
	}
	return (
		<button
			css={css(
				getColorStyle(),
				getSizeStyle(),
				mq({
					width: isFullWidth ? '100%' : 'auto',
					color: 'white',
					borderStyle: 'none',
					fontWeight: theme.fontWeight.semibold,
					display: 'flex',
					alignItems: 'center',
					cursor: 'pointer',
					justifyContent: 'center',
					gap: theme.spacing[2],
				}),
				style
			)}
			// className={className}
			onClick={() => !isDisabled && onClick()}
			type={type}
		>
			{children}
			{isLoading && <IconLoading size={20} className="fill-white mx-1" />}
		</button>
	)
}

export default Button
