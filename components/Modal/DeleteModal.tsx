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

const DeleteModal = ({ isOpen, onClose, style }: DeleteModalProps) => {
	const theme = useTheme()

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
					Are you sure want to delete this phone number?
				</p>
				<Button color="danger" isFullWidth onClick={() => {}}>
					Delete
				</Button>
			</div>
		</Modal>
	)
}

export default DeleteModal
