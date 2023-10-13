import { Dispatch, SetStateAction } from 'react'

export interface IToast {
	message: null | string
	type: null | 'error' | 'success'
}

export interface IToastContext {
	showToast: IToast
	setShowToast: Dispatch<SetStateAction<IToast>>
	setShowToastWithTimeout: (toast: IToast, timeout: number) => void
}
