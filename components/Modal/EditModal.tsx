import { EditModalProps } from '@/interfaces/modal'
import Modal from '../Common/Modal'
import { css, useTheme } from '@emotion/react'
import {
	marginHorizontalAuto,
	paddingHorizontal,
	paddingVertical,
} from '@/styles/common'
import { title1 } from '@/styles/typography'
import { mq } from '@/utils/common'
import InputText from '../Common/InputText'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditModalFormValues } from '@/interfaces/form'
import Button from '../Common/Button'
import { useEffect } from 'react'

const EditModal = ({ isOpen, onClose, style }: EditModalProps) => {
	const theme = useTheme()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EditModalFormValues>()

	const onEdit: SubmitHandler<EditModalFormValues> = async (data) => {}

	useEffect(() => {
		reset({})
	}, [isOpen])

	return (
		<Modal isOpen={isOpen} onClose={onClose} style={style}>
			<div
				css={css(
					paddingVertical(theme, 8),
					paddingHorizontal(theme, 8),
					marginHorizontalAuto(),
					mq({
						width: ['100%', '40%'],
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
						})
					)}
				>
					Edit Phone Number
				</p>
				<form onSubmit={handleSubmit(onEdit)}>
					<InputText
						{...register('name', { required: true })}
						label={'Name'}
						placeholder="Enter name..."
						parentStyle={{
							marginBottom: theme.spacing[3],
						}}
						errorMessage={
							errors.name?.type === 'required' && `You must fill name`
						}
					/>
					<InputText
						{...register('phone_number', { required: true })}
						label={'Phone Number'}
						placeholder="Enter phone number"
						parentStyle={{
							marginBottom: theme.spacing[5],
						}}
						errorMessage={
							errors.phone_number?.type === 'required' &&
							`You must fill phone number`
						}
					/>
					<Button
						color="plain"
						size="lg"
						type="submit"
						isFullWidth
						onClick={() => {}}
					>
						Edit
					</Button>
				</form>
			</div>
		</Modal>
	)
}

export default EditModal
