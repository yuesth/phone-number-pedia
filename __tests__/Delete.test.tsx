import DeleteModal from '@/components/Modal/DeleteModal'
import { ContactQueries } from '@/quries/contact'
import { baseTheme } from '@/themes/base'
import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, waitFor } from '@testing-library/react'

describe('Delete contact and its functionality', () => {
	it('show delete modal to delete contact', () => {
		const deleteModal = render(
			<MockedProvider mocks={[]} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<DeleteModal isOpen={true} onClose={jest.fn()} />
				</ThemeProvider>
			</MockedProvider>
		)
		const showTitle = deleteModal.getByText('Delete Confirmation')
		expect(showTitle).toBeInTheDocument()
	})

	it('after click delete, deleted contact should be removed from list', async () => {
		const { deleteContact } = ContactQueries()
		const mockData = {
			first_name: 'Yues',
			last_name: 'tadrik',
			id: 2191,
			phones: [{ number: '0192129' }],
		}
		const mockVariable = {
			id: 2191,
		}
		const responseVariable = {
			delete_contact_by_pk: {
				first_name: 'Yues',
				last_name: 'tadrik',
				id: 2191,
			},
		}
		const mocks = [
			{
				request: {
					query: deleteContact,
					variables: mockVariable,
					result: { data: responseVariable },
				},
			},
		]
		const mockRefetch = jest.fn()
		const { getByText, container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<ThemeProvider theme={baseTheme}>
					<DeleteModal
						isOpen={true}
						onClose={jest.fn()}
						refetch={mockRefetch}
						data={mockData}
					/>
				</ThemeProvider>
			</MockedProvider>
		)

		const deleteBtn = getByText('Delete')
		fireEvent.click(deleteBtn)
		await waitFor(() => {
			expect(container.innerHTML).not.toMatch('Yues tadrik')
		})
	})
})
