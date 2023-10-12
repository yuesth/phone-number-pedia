import { ModalProps } from '@/interfaces/modal'
import { mq } from '@/utils/common'
import { css, useTheme } from '@emotion/react'
import React, { useRef } from 'react'
import IconX from '../Svg/IconX'
import { paddingHorizontal, paddingVertical } from '@/styles/common'

const Modal = ({ isOpen, style, onClose, children }: ModalProps) => {
	const modalRef = useRef(null)
	const theme = useTheme()

	const _bgClick = (e: React.MouseEvent) => {
		if (e.target === modalRef.current) {
			onClose()
		}
	}

	if (!isOpen) return null

	return (
		<div
			ref={modalRef}
			css={css(
				mq({
					alignItems: ['end', 'center'],
				}),
				{
					position: 'fixed',
					inset: '0px',
					zIndex: 10,
					display: 'flex',
					backgroundColor: 'rgba(0,0,0,0.8)',
				},
				style
			)}
			onClick={_bgClick}
		>
			<button
				css={css(
					{
						position: `absolute`,
						top: theme.spacing[5],
						right: theme.spacing[5],
						borderRadius: theme.rounded.full,
						border: `1px solid white`,
						backgroundColor: `transparent`,
						display: `flex`,
						alignItems: `center`,
						cursor: `pointer`,
					},
					paddingVertical(theme, 2),
					paddingHorizontal(theme, 2)
				)}
				onClick={onClose}
			>
				<IconX
					size={20}
					style={{
						fill: `white`,
					}}
				/>
			</button>
			{children}
		</div>
	)
}

export default Modal
