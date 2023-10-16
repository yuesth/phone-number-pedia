import { TRefetch } from '@/types/apollo'
import { CSSInterpolation } from '@emotion/css'
import React, { Dispatch, SetStateAction } from 'react'
import { ContactRes, IContact } from './contact'
import { HomeModalProps } from './home'
import { PhoneRes } from './phone'

export interface ModalProps {
	isOpen: boolean
	onClose: () => void
	refetch?: TRefetch<ContactRes>
	refetchPhoneList?: TRefetch<PhoneRes | undefined>
	style?: CSSInterpolation
	children?: React.ReactNode
}

export interface AddModalProps extends ModalProps {
	data?: any
}

export interface DeleteModalProps extends ModalProps {
	data?: IContact
	favorites: number[]
	setFavorites: Dispatch<SetStateAction<number[]>>
}

export interface EditModalProps extends ModalProps {
	data?: IContact
}

export interface FavoriteModalProps extends ModalProps {
	showDelete: boolean
	setShowDelete: Dispatch<SetStateAction<HomeModalProps>>
	showEdit: boolean
	setShowEdit: Dispatch<SetStateAction<HomeModalProps>>
	favorites: number[]
	setFavorites: Dispatch<SetStateAction<number[]>>
}
