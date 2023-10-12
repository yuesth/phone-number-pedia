import { CSSInterpolation } from '@emotion/css'
import React from 'react'

export interface ModalProps {
	isOpen: boolean
	onClose: () => void
	style?: CSSInterpolation
	children?: React.ReactNode
}

export interface AddModalProps extends ModalProps {
	data?: any
}

export interface DeleteModalProps extends ModalProps {
	data?: any
}

export interface EditModalProps extends ModalProps {
	data?: any
}
