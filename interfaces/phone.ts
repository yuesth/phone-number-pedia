import { IContact } from './contact'

export interface IPhone {
	contact: IContact
	number: string
}

export interface PhoneRes {
	phone: IPhone[]
}
