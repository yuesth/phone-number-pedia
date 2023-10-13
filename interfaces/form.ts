import { CSSInterpolation } from '@emotion/css'
import React, { ChangeEvent } from 'react'

export interface InputTextProps {
	placeholder: string
	value?: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	name: string
	errorMessage?: string | React.ReactNode
	style?: CSSInterpolation
	parentStyle?: CSSInterpolation
	label?: string | React.ReactNode
}

export interface AddModalFormValues {
	first_name: string
	last_name: string
	phone_number: string
	phones: { number: string }[]
}

export interface EditModalFormValues {
	first_name: string
	last_name: string
	phone_number: string
	phones: { number: string }[]
}
