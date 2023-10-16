import EditModal from '@/components/Modal/EditModal'
import { ContactQueries } from '@/quries/contact'
import { baseTheme } from '@/themes/base'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('Edit contact and its functionality', () => {
	it('show edit modal to edit contact', () => {
		const addModal = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<EditModal isOpen={true} onClose={jest.fn()} />
				</ThemeProvider>
			</MockedProvider>
		)
		const showTitle = addModal.getByText('Edit Contact')
		expect(showTitle).toBeInTheDocument()
	})

	it('when showed, default input value already provided', async () => {
		const mockData = {
			first_name: 'Yues',
			last_name: 'tadrik',
			id: 2191,
			phones: [{ number: '0192129' }],
		}
		render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<EditModal isOpen={true} onClose={jest.fn()} data={mockData} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = screen.getByLabelText('First Name')
		expect(firstNameInput).toHaveValue('Yues')
		const lastNameInput = screen.getByLabelText('Last Name')
		expect(lastNameInput).toHaveValue('tadrik')
		const phoneNumberInput = screen.getByTestId('input-phones.0.number')
		expect(phoneNumberInput).toHaveValue('0192129')
	})

	it('empty first name, fill the remain field, should not be submitted', async () => {
		const mockData = {
			first_name: 'Yues',
			last_name: 'tadrik',
			id: 2191,
			phones: [{ number: '0192129' }],
		}
		const { container, getByLabelText, getByText } = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<EditModal isOpen={true} onClose={jest.fn()} data={mockData} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: '' } })

		const lastNameInput = getByLabelText('Last Name')
		fireEvent.change(lastNameInput, { target: { value: 'Tadrik' } })

		const editBtn = getByText('Edit')
		fireEvent.click(editBtn)

		await waitFor(() => {
			expect(container.innerHTML).toMatch('You must fill first name')
		})
	})

	it('empty last name, fill the remain field, should not appears error ', async () => {
		const { editContact } = ContactQueries()
		const mockVariable = {
			id: 2230,
			_set: {
				first_name: 'Yuess',
				last_name: '',
			},
		}
		const responseVariable = {
			update_contact_by_pk: {
				id: 2230,
				first_name: 'Yuess',
				last_name: '',
				phones: [
					{
						number: '',
					},
				],
			},
		}
		const mocks = [
			{
				request: {
					query: editContact,
					variables: mockVariable,
					result: { data: responseVariable },
				},
			},
		]
		const { container, getByLabelText, getByText } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<EditModal isOpen={true} onClose={jest.fn()} data={mockVariable} />
				</ThemeProvider>
			</MockedProvider>
		)

		const firstNameInput = getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: 'Yuess' } })

		const lastNameInput = getByLabelText('Last Name')
		fireEvent.change(lastNameInput, { target: { value: '' } })

		const editBtn = getByText('Edit')
		fireEvent.click(editBtn)

		await waitFor(() => {
			expect(container.innerHTML).not.toMatch('You must fill last name')
		})
	})

	it('empty phone number after add field, fill the remain field, should not be edited', async () => {
		const mockVariable = {
			first_name: 'Yues',
			last_name: '',
			phones: [{ number: '0891922218' }],
		}
		const { container, getByLabelText, findByPlaceholderText, getByText } =
			render(
				<MockedProvider mocks={[]} addTypename={false}>
					<ThemeProvider theme={baseTheme}>
						<EditModal isOpen={true} onClose={jest.fn()} data={mockVariable} />
					</ThemeProvider>
				</MockedProvider>
			)

		const firstNameInput = getByLabelText('First Name')
		fireEvent.change(firstNameInput, { target: { value: 'Yues' } })

		const lastNameInput = getByLabelText('Last Name')
		fireEvent.change(lastNameInput, { target: { value: 'tadrik' } })

		const phoneNameInput = await findByPlaceholderText('Enter phone number')
		fireEvent.change(phoneNameInput, { target: { value: '' } })

		const editBtn = getByText('Edit')
		fireEvent.click(editBtn)

		await waitFor(() => {
			expect(container.innerHTML).toMatch('You must fill phone number')
		})
	})
})
