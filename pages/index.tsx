import Card from '@/components/Card/Card'
import BaseLayout from '@/components/Common/BaseLayout'
import Button from '@/components/Common/Button'
import InputText from '@/components/Common/InputText'
import AddModal from '@/components/Modal/AddModal'
import DeleteModal from '@/components/Modal/DeleteModal'
import EditModal from '@/components/Modal/EditModal'
import { HomeModalProps } from '@/interfaces/home'
import { mq } from '@/utils/common'
import { css, useTheme } from '@emotion/react'
import { useState } from 'react'

export default function Home() {
	const theme = useTheme()
	const defaultModalProps: HomeModalProps = {
		show: false,
	}
	const [addModalProps, setAddModalProps] =
		useState<HomeModalProps>(defaultModalProps)
	const [deleteModalProps, setDeleteModalProps] =
		useState<HomeModalProps>(defaultModalProps)
	const [editModalProps, setEditModalProps] =
		useState<HomeModalProps>(defaultModalProps)

	return (
		<BaseLayout>
			<p
				css={{
					fontSize: theme.fontSize['4xl'],
					textAlign: `center`,
					marginBottom: theme.spacing[8],
				}}
			>
				Phone Number Pedia
			</p>
			<div
				css={css(
					mq({
						display: 'flex',
						alignItems: 'center',
						width: `100%`,
						marginBottom: theme.spacing[6],
						flexDirection: [`column`, `row`],
						flexWrap: `wrap`,
					})
				)}
			>
				<InputText
					placeholder="Search phone number..."
					parentStyle={mq({
						width: [`100%`, `75%`],
						marginRight: [0, theme.spacing[2]],
						marginBottom: [theme.spacing[2], 0],
					})}
					name="search"
					onChange={() => {}}
				/>
				<Button
					color="primary"
					style={{
						flex: `1 1 0%`,
					}}
					isFullWidth
					onClick={() => setAddModalProps({ show: true })}
				>
					Add phone number
				</Button>
			</div>
			<div
				css={mq({
					display: 'grid',
					gridTemplateColumns: ['auto', 'auto auto'],
					gap: theme.spacing[4],
				})}
			>
				{[...Array(12)].map((doc, idx) => {
					return (
						<Card
							key={idx}
							setShowDelete={() => setDeleteModalProps({ show: true })}
							showDelete={deleteModalProps.show}
							setShowEdit={() => setEditModalProps({ show: true })}
							showEdit={editModalProps.show}
						/>
					)
				})}
			</div>
			<AddModal
				isOpen={addModalProps.show}
				onClose={() => setAddModalProps({ show: false })}
			/>
			<DeleteModal
				isOpen={deleteModalProps.show}
				onClose={() => setDeleteModalProps({ show: false })}
			/>
			<EditModal
				isOpen={editModalProps.show}
				onClose={() => setEditModalProps({ show: false })}
			/>
		</BaseLayout>
	)
}
