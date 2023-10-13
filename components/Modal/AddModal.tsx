import { AddModalProps } from '@/interfaces/modal'
import Modal from '../Common/Modal'
import { css, useTheme } from '@emotion/react'
import {
	marginHorizontalAuto,
	paddingHorizontal,
	paddingVertical,
} from '@/styles/common'
import { title1, title2 } from '@/styles/typography'
import { mq } from '@/utils/common'
import InputText from '../Common/InputText'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AddModalFormValues } from '@/interfaces/form'
import Button from '../Common/Button'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ContactQueries } from '@/quries/contact'
import { useToast } from '@/providers/ToastProvider'
import IconPlus from '../Svg/IconPlus'
import IconTrash from '../Svg/IconTrash'

const AddModal = ({ isOpen, onClose, style, refetch }: AddModalProps) => {
	const theme = useTheme()
	const { addContactWithPhones } = ContactQueries()
	const { setShowToastWithTimeout } = useToast()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm<AddModalFormValues>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'phones',
	})

	const [mutateAdd, { loading }] = useMutation(addContactWithPhones)

	const onAdd: SubmitHandler<AddModalFormValues> = async (data) => {
		try {
			await mutateAdd({
				variables: {
					first_name: data.first_name,
					last_name: data.last_name,
					phones: data.phones,
				},
			})
			await refetch?.({
				limit: 10,
				offset: 0,
			})
			onClose()
			setShowToastWithTimeout(
				{
					message: 'Contact added successfully',
					type: 'success',
				},
				5000
			)
		} catch (error) {
			onClose()
			setShowToastWithTimeout(
				{
					message: 'Error to add contact',
					type: 'error',
				},
				5000
			)
		}
	}

	useEffect(() => {
		reset({})
		remove()
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					Add Contact
				</p>
				<form onSubmit={handleSubmit(onAdd)}>
					<InputText
						{...register('first_name', {
							required: true,
							pattern: /^[a-zA-Z0-9]+$/,
						})}
						label={'First Name'}
						placeholder="Enter first name..."
						parentStyle={{
							marginBottom: theme.spacing[3],
						}}
						errorMessage={
							errors.first_name?.type === 'required' &&
							`You must fill first name`
						}
					/>
					<InputText
						{...register('last_name', {
							pattern: /^[a-zA-Z0-9]+$/,
						})}
						label={'Last Name'}
						placeholder="Enter last name..."
						parentStyle={{
							marginBottom: theme.spacing[3],
						}}
					/>
					<div
						css={css({
							display: `flex`,
							alignItems: `center`,
							gap: theme.spacing[2],
						})}
					>
						<p css={css(title2(theme))}>Add Phone number</p>
						<IconPlus
							size={20}
							style={{ stroke: `white`, cursor: `pointer` }}
							onClick={() => append({ number: '' })}
						/>
					</div>
					<div
						css={css({
							overflowY: `auto`,
							maxHeight: `30vh`,
							marginBottom: theme.spacing[5],
						})}
					>
						{fields.map((field, idx) => (
							<div
								key={idx}
								css={{
									display: `flex`,
									alignItems: `center`,
									gap: theme.spacing[2],
								}}
							>
								<InputText
									{...register(`phones.${idx}.number`, { required: true })}
									placeholder="Enter phone number"
									parentStyle={{
										marginBottom: theme.spacing[2],
									}}
									errorMessage={
										errors.phones?.[idx]?.type === 'required' &&
										`You must fill phone number`
									}
								/>
								<IconTrash
									size={20}
									style={{
										stroke: theme.colors.tone.negative,
										cursor: `pointer`,
									}}
									onClick={() => remove(idx)}
								/>
							</div>
						))}
					</div>
					<Button
						color="primary"
						size="lg"
						type="submit"
						isFullWidth
						onClick={() => {}}
						isDisabled={loading}
					>
						{loading ? 'Loading...' : 'Add'}
					</Button>
				</form>
			</div>
		</Modal>
	)
}

export default AddModal
