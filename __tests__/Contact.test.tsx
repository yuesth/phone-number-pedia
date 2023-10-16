import Card from '@/components/Card/Card'
import { CONTACT_LIST_LIMIT } from '@/constants/contact'
import Home from '@/pages'
import { ContactQueries } from '@/quries/contact'
import { baseTheme } from '@/themes/base'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('contact', () => {
	render(
		<ThemeProvider theme={baseTheme}>
			<Card
				showDelete={true}
				setShowDelete={jest.fn()}
				showEdit={true}
				setShowEdit={jest.fn()}
				data={{
					first_name: 'Adi',
					last_name: 'irawan',
					phones: [
						{
							number: '081291929',
						},
					],
				}}
				favorites={[]}
				setFavorites={jest.fn()}
			/>
		</ThemeProvider>
	)

	it('show contact list contains name and phone number', () => {
		const name = screen.getByText('Adi irawan')
		const phone_number = screen.getByText('081291929')
		expect(name).toBeInTheDocument()
		expect(phone_number).toBeInTheDocument()
	})

	it('when add contact to favorites list, contact should be removed from contact list, and appears in favorite modal', async () => {
		const { queryContactList, queryContactDetail } = ContactQueries()
		const mockVariable = {
			limit: CONTACT_LIST_LIMIT,
			offset: 0,
		}
		const mockVariable2 = {
			id: 28820,
		}
		const mocks = [
			{
				request: {
					query: queryContactList,
					variables: mockVariable,
				},
				result: {
					data: {
						contact: [
							{
								created_at: '2023-10-14T16:48:41.079969+00:00',
								first_name: 'dsa',
								id: 28820,
								last_name: 'sad',
								phones: [
									{
										number: '',
									},
								],
							},
							{
								created_at: '2023-10-14T16:48:41.079969+00:00',
								first_name: 'aaa',
								id: 28821,
								last_name: 'bbb',
								phones: [
									{
										number: '0811111',
									},
								],
							},
						],
					},
				},
			},
			{
				request: {
					query: queryContactDetail,
					variables: mockVariable2,
				},
				result: {
					data: {
						contact_by_pk: {
							last_name: 'sad',
							id: 28820,
							first_name: 'dsa',
							created_at: '2023-10-12T16:01:24.658359+00:00',
							phones: [
								{
									number: '',
								},
							],
						},
					},
				},
			},
			{
				request: {
					query: queryContactDetail,
					variables: { id: 0 },
				},
				result: {
					data: {
						contact_by_pk: {
							last_name: '',
							id: 0,
							first_name: '',
							created_at: '',
							phones: [
								{
									number: '',
								},
							],
						},
					},
				},
			},
		]
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<Home />
				</ThemeProvider>
			</MockedProvider>
		)
		await waitFor(async () => {
			const cardFavBtn = screen.getByTestId('favorite-dsa', { exact: false })
			fireEvent.click(cardFavBtn)
			expect(container.innerHTML).not.toMatch('dsa sad')
		})

		await waitFor(() => {
			const favListBtn = screen.getByTestId('favorite-undefined', {
				exact: false,
			})
			fireEvent.click(favListBtn)
			const favModal = screen.getByText('Your Favorite Contacts')
			expect(favModal).toBeInTheDocument()
			expect(container.innerHTML).toMatch('dsa sad')
		})
	})
})
