import { DeleteModalProps } from '@/interfaces/modal'
import Modal from '../Common/Modal'
import { css, useTheme } from '@emotion/react'
import {
	marginHorizontalAuto,
	paddingHorizontal,
	paddingVertical,
} from '@/styles/common'
import { body, title1 } from '@/styles/typography'
import { mq } from '@/utils/common'
import Button from '../Common/Button'
import { ContactQueries } from '@/quries/contact'
import { useMutation } from '@apollo/client'
import { useToast } from '@/providers/ToastProvider'

const DeleteModal = ({
	isOpen,
	onClose,
	style,
	data,
	refetch,
}: DeleteModalProps) => {
	const theme = useTheme()
	const { deleteContact } = ContactQueries()
	const { setShowToastWithTimeout } = useToast()
	const [mutateDelete, { loading }] = useMutation(deleteContact)

	const onDelete = async () => {
		try {
			await mutateDelete({
				variables: {
					id: data?.id,
				},
			})
			onClose()
			setShowToastWithTimeout(
				{
					message: 'Contact deleted successfully',
					type: 'success',
				},
				5000
			)
			await refetch?.({
				limit: 10,
				offset: 0,
			})
		} catch (error) {
			onClose()
			setShowToastWithTimeout(
				{
					message: 'Error to delete contact',
					type: 'error',
				},
				5000
			)
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} style={style}>
			<div
				css={css(
					paddingVertical(theme, 8),
					paddingHorizontal(theme, 8),
					marginHorizontalAuto(),
					mq({
						width: ['100%', '20%'],
						borderRadius: ['0px', theme.rounded.xl],
						backgroundColor: 'black',
					}),
					{
						borderTop: theme.rounded.xl,
						border: `1px solid ${theme.colors.gray}`,
					}
				)}
			>
				<p
					css={css(
						title1(theme, {
							marginBottom: theme.spacing[5],
							textAlign: `center`,
						})
					)}
				>
					Delete Confirmation
				</p>
				<p
					css={css(
						body(theme, {
							marginBottom: theme.spacing[5],
							textAlign: `center`,
						})
					)}
				>
					Are you sure want to delete this phone number{' '}
					<strong>({data?.phones?.[0].number})</strong>?
				</p>
				<Button color="danger" isFullWidth onClick={onDelete}>
					{loading ? 'Loading...' : 'Delete'}
				</Button>
			</div>
		</Modal>
	)
}

export default DeleteModal
