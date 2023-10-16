import AddModal from '@/components/Modal/AddModal'
import { ContactQueries } from '@/quries/contact'
import { baseTheme } from '@/themes/base'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('Form and its rules', () => {
	it('should be add multiple phone number', async () => {
		const mockRefetch = jest.fn()
		render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal isOpen={true} onClose={jest.fn()} refetch={mockRefetch} />
				</ThemeProvider>
			</MockedProvider>
		)
		const appendBtn = await screen.findByTestId('plus', { exact: false })

		fireEvent.click(appendBtn)
		const phoneName1Input = await screen.findByTestId('input-phones.0.number')
		fireEvent.change(phoneName1Input, { target: { value: '0111111' } })

		fireEvent.click(appendBtn)
		const phoneName2nput = await screen.findByTestId('input-phones.1.number')
		fireEvent.change(phoneName2nput, { target: { value: '0222222' } })
	})

	it('First and last name should not contain special characters', async () => {
		const mockRefetch = jest.fn()
		const { container } = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal isOpen={true} onClose={jest.fn()} refetch={mockRefetch} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = screen.getByLabelText('First Name')
		const lastNameInput = screen.getByLabelText('Last Name')
		fireEvent.change(firstNameInput, { target: { value: 'yues_tadrik' } })
		fireEvent.change(lastNameInput, { target: { value: 'hafiyan^' } })
		const addBtn = screen.getByText('Add')
		fireEvent.click(addBtn)
		await waitFor(() => {
			expect(container.innerHTML).toMatch(
				'First name must not contain special characters'
			)
			expect(container.innerHTML).toMatch(
				'Last name must not contain special characters'
			)
		})
	})

	it('First name should be unique', async () => {
		const { queryPhoneList } = ContactQueries()
		const mockRefetch = jest.fn()
		const mockVariable = {
			where: {
				contact: {
					first_name: {
						_like: 'Garry',
					},
				},
			},
		}
		const mocks = [
			{
				request: {
					query: queryPhoneList,
					variables: mockVariable,
				},
				result: {
					data: {
						phone: [
							{
								contact: {
									last_name: '',
									first_name: 'Garry',
									id: 28656,
									created_at: '2023-10-12T07:10:47.809829+00:00',
								},
								number: '1231231',
							},
						],
					},
				},
				newData: jest.fn(() => ({
					data: {
						dog: {
							id: 28656,
							first_name: 'Garry',
							last_name: '',
						},
					},
				})),
			},
		]
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal
						isOpen={true}
						onClose={jest.fn()}
						refetch={mockRefetch}
						refetchPhoneList={jest.fn()}
					/>
				</ThemeProvider>
			</MockedProvider>
		)
		const firstNameInput = screen.getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: 'Garry' } })

		await waitFor(() => {
			expect(container.innerHTML).not.toMatch('First name must be unique')
		})
	})
})
