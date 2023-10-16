import AddModal from '@/components/Modal/AddModal'
import { ContactQueries } from '@/quries/contact'
import { baseTheme } from '@/themes/base'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Add contact and its functionality', () => {
	userEvent.setup()
	it('show add modal to add contact', () => {
		const addModal = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal isOpen={true} onClose={jest.fn()} />
				</ThemeProvider>
			</MockedProvider>
		)
		const showTitle = addModal.getByText('Add Contact')
		expect(showTitle).toBeInTheDocument()
	})

	it('empty first name, fill the remain field, should not be submitted', async () => {
		const mockRefetch = jest.fn()
		const { container, findByTestId, getByLabelText, getByText } = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal isOpen={true} onClose={jest.fn()} refetch={mockRefetch} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: '' } })

		const lastNameInput = getByLabelText('Last Name')
		fireEvent.change(lastNameInput, { target: { value: 'Tadrik' } })

		const appendBtn = await findByTestId('plus', { exact: false })
		fireEvent.click(appendBtn)

		const phoneNameInput = await findByTestId('input-phones.0.number')
		fireEvent.change(phoneNameInput, { target: { value: '0891922218' } })

		const addBtn = getByText('Add')
		fireEvent.click(addBtn)

		await waitFor(() => {
			expect(container.innerHTML).toMatch('You must fill first name')
			expect(mockRefetch).not.toBeCalled()
		})
	})

	it('empty last name, fill the remain field, should not appears error', async () => {
		const { addContactWithPhones } = ContactQueries()
		const mockVariable = {
			first_name: 'Yues',
			last_name: '',
			phones: [{ number: '0891922218' }],
		}
		const responseVariable = {
			first_name: 'Yues',
			last_name: '',
			phones: [{ number: '0891922218' }],
		}
		const mocks = [
			{
				request: {
					query: addContactWithPhones,
					variables: mockVariable,
					result: { data: responseVariable },
				},
			},
		]
		const mockRefetch = jest.fn()
		const { container, findByTestId, getByLabelText, getByText } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal isOpen={true} onClose={jest.fn()} refetch={mockRefetch} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: 'Yues' } })

		const lastNameInput = getByLabelText('Last Name')
		fireEvent.change(lastNameInput, { target: { value: '' } })

		const appendBtn = await findByTestId('plus', { exact: false })
		fireEvent.click(appendBtn)

		const phoneNameInput = await findByTestId('input-phones.0.number')
		fireEvent.change(phoneNameInput, { target: { value: '0891922218' } })

		const addBtn = getByText('Add')
		fireEvent.click(addBtn)

		await waitFor(() => {
			expect(container.innerHTML).not.toMatch('You must fill last name')
		})
	})

	it('empty phone number after add field, fill the remain field, should not be added', async () => {
		const mockRefetch = jest.fn()
		const { container, findByTestId, getByLabelText, getByText } = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<AddModal isOpen={true} onClose={jest.fn()} refetch={mockRefetch} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: 'Yues' } })

		const lastNameInput = getByLabelText('Last Name')
		fireEvent.change(lastNameInput, { target: { value: 'tadrik' } })

		const appendBtn = await findByTestId('plus', { exact: false })
		fireEvent.click(appendBtn)

		const phoneNameInput = await findByTestId('input-phones.0.number')
		fireEvent.change(phoneNameInput, { target: { value: '' } })

		const addBtn = getByText('Add')
		fireEvent.click(addBtn)

		await waitFor(() => {
			expect(container.innerHTML).toMatch('You must fill phone number')
			expect(mockRefetch).not.toBeCalled()
		})
	})
})
