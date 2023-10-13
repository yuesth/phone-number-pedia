export interface IContact {
	__typename?: string
	created_at?: string
	first_name?: string
	id?: number
	last_name?: string
	phones?: IPhoneContact[]
}

export interface IPhoneContact {
	number: string
}

export interface ContactRes {
	contact: IContact[]
}

export interface ContactDetailRes {
	contact_by_pk: IContact
}
