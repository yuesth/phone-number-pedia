import { CSSInterpolation } from '@emotion/css'

export interface IconProps {
	size: number
	className?: string
	color?: string
	onClick?: () => void
	isDisabled?: boolean
	style?: CSSInterpolation
}
