import { gql } from '@apollo/client'

export const ContactQueries = () => {
	const queryContactList = gql`
		query GetContactList($limit: Int, $offset: Int) {
			contact(limit: $limit, offset: $offset) {
				created_at
				first_name
				id
				last_name
				phones {
					number
				}
			}
		}
	`

	const queryContactDetail = gql`
		query GetContactDetail($id: Int!) {
			contact_by_pk(id: $id) {
				last_name
				id
				first_name
				created_at
				phones {
					number
				}
			}
		}
	`

	const queryPhoneList = gql`
		query GetPhoneList(
			$where: phone_bool_exp
			$distinct_on: [phone_select_column!]
			$limit: Int = 10
			$offset: Int = 0
			$order_by: [phone_order_by!]
		) {
			phone(
				where: $where
				distinct_on: $distinct_on
				limit: $limit
				offset: $offset
				order_by: $order_by
			) {
				contact {
					last_name
					first_name
					id
				}
				number
			}
		}
	`
	const addContactWithPhones = gql`
		mutation AddContactWithPhones(
			$first_name: String!
			$last_name: String!
			$phones: [phone_insert_input!]!
		) {
			insert_contact(
				objects: {
					first_name: $first_name
					last_name: $last_name
					phones: { data: $phones }
				}
			) {
				returning {
					first_name
					last_name
					id
					phones {
						number
					}
				}
			}
		}
	`

	const deleteContact = gql`
		mutation MyMutation($id: Int!) {
			delete_contact_by_pk(id: $id) {
				first_name
				last_name
				id
			}
		}
	`

	const editContact = gql`
		mutation EditContactById($id: Int!, $_set: contact_set_input) {
			update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
				id
				first_name
				last_name
				phones {
					number
				}
			}
		}
	`

	const editPhone = gql`
		mutation EditPhoneNumber(
			$pk_columns: phone_pk_columns_input!
			$new_phone_number: String!
		) {
			update_phone_by_pk(
				pk_columns: $pk_columns
				_set: { number: $new_phone_number }
			) {
				contact {
					id
					last_name
					first_name
					created_at
					phones {
						number
					}
				}
			}
		}
	`

	return {
		queryContactList,
		queryContactDetail,
		queryPhoneList,
		addContactWithPhones,
		deleteContact,
		editContact,
		editPhone,
	}
}
