import { Dispatch, SetStateAction } from 'react'
import { IContact } from './contact'

export interface CardProps {
	showDelete: boolean
	setShowDelete: () => void
	showEdit: boolean
	setShowEdit: () => void
	data: IContact
	setFavorites: Dispatch<SetStateAction<number[]>>
	favorites: number[]
}
