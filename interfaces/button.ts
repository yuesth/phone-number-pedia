import { TColor, TSize } from '@/types/button'
import { CSSInterpolation } from '@emotion/css'
import React from 'react'

export interface ButtonProps {
	color: TColor
	children: React.ReactNode
	onClick: Function
	size?: TSize
	isDisabled?: boolean
	isFullWidth?: boolean
	isLoading?: boolean
	className?: string
	style?: CSSInterpolation
	type?: 'button' | 'reset' | 'submit'
}
