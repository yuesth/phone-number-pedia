import { EditModalProps } from '@/interfaces/modal'
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
import { EditModalFormValues } from '@/interfaces/form'
import Button from '../Common/Button'
import { useEffect } from 'react'
import { useToast } from '@/providers/ToastProvider'
import { useMutation } from '@apollo/client'
import { ContactQueries } from '@/quries/contact'
import IconPlus from '../Svg/IconPlus'
import IconTrash from '../Svg/IconTrash'

const EditModal = ({
	isOpen,
	onClose,
	style,
	data,
	refetch,
}: EditModalProps) => {
	const theme = useTheme()
	const { setShowToastWithTimeout } = useToast()
	const { editContact, editPhone } = ContactQueries()
	const [mutateEdit, { loading: loadingEdit }] = useMutation(editContact)
	const [mutatePhone, { loading: loadingPhone }] = useMutation(editPhone)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
		control,
	} = useForm<EditModalFormValues>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'phones',
	})

	const onEdit: SubmitHandler<EditModalFormValues> = async (formData) => {
		try {
			await mutateEdit({
				variables: {
					id: data?.id,
					_set: {
						first_name: formData.first_name,
						last_name: formData.last_name,
					},
				},
			})
			await Promise.all(
				formData.phones.map((phone, idx) =>
					mutatePhone({
						variables: {
							pk_columns: {
								number: data?.phones?.[idx].number,
								contact_id: data?.id,
							},
							new_phone_number: phone.number,
						},
					})
				)
			)
			onClose()
			setShowToastWithTimeout(
				{
					message: 'Contact edited successfully',
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
					message: 'Error to edit contact',
					type: 'error',
				},
				5000
			)
		}
	}

	useEffect(() => {
		if (isOpen) {
			setValue('first_name', data?.first_name || '')
			setValue('last_name', data?.last_name || '')
			data?.phones?.forEach((value) => {
				append({ number: value.number || '' })
			})
		} else {
			reset({})
			remove()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, data])

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
						{...register('first_name', { required: true })}
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
						{...register('last_name', { required: true })}
						label={'Last Name'}
						placeholder="Enter last name..."
						parentStyle={{
							marginBottom: theme.spacing[3],
						}}
						errorMessage={
							errors.last_name?.type === 'required' && `You must fill last name`
						}
					/>
					{/* <InputText
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
					/> */}
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
						color="plain"
						size="lg"
						type="submit"
						isFullWidth
						onClick={() => {}}
					>
						{loadingEdit || loadingPhone ? 'Loading...' : 'Edit'}
					</Button>
				</form>
			</div>
		</Modal>
	)
}

export default EditModal
