import { InputTextProps } from '@/interfaces/form'
import {
	marginVertical,
	paddingHorizontal,
	paddingVertical,
} from '@/styles/common'
import { label } from '@/styles/typography'
import { css, useTheme } from '@emotion/react'
import { forwardRef } from 'react'

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props, ref) => {
	const theme = useTheme()
	return (
		<div
			css={css(
				{
					display: 'flex',
					flexDirection: `column`,
				},
				props.parentStyle
			)}
		>
			{props.label && (
				<label
					css={css(
						{
							marginBottom: theme.spacing[1],
						},
						label(theme)
					)}
					htmlFor={props.name}
				>
					{props.label}
				</label>
			)}
			<input
				type="text"
				data-testid={`input-${props.name}`}
				ref={ref}
				id={props.name}
				name={props.name}
				onChange={props.onChange}
				value={props.value}
				placeholder={props.placeholder}
				css={css(
					{
						appearance: `none`,
						backgroundColor: theme.colors.primary,
						border: `1px solid ${theme.colors.gray}`,
						borderRadius: theme.rounded.lg,
						outline: `none`,
						color: theme.colors.secondary,
					},
					paddingVertical(theme, 3),
					paddingHorizontal(theme, 3),
					props.style
				)}
			/>
			{props.errorMessage && (
				<p
					css={css(
						label(theme),
						{
							color: theme.colors.tone.negative,
						},
						marginVertical(theme, 1)
					)}
				>
					{props.errorMessage}
				</p>
			)}
		</div>
	)
})

export default InputText

InputText.displayName = 'InputText'
