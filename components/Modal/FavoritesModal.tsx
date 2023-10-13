import { FavoriteModalProps } from '@/interfaces/modal'
import Modal from '../Common/Modal'
import { css, useTheme } from '@emotion/react'
import {
	marginHorizontalAuto,
	paddingHorizontal,
	paddingVertical,
} from '@/styles/common'
import { title1 } from '@/styles/typography'
import { mq } from '@/utils/common'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'
import { ContactDetailRes, IContact } from '@/interfaces/contact'
import { ContactQueries } from '@/quries/contact'
import { useQuery } from '@apollo/client'

const FavoriteModal = ({
	isOpen,
	onClose,
	style,
	setShowDelete,
	showDelete,
	setShowEdit,
	showEdit,
	favorites,
	setFavorites,
}: FavoriteModalProps) => {
	const { queryContactDetail } = ContactQueries()
	const theme = useTheme()
	const [favData, setFavData] = useState<IContact[]>([])
	const { data: resData, refetch } = useQuery<ContactDetailRes>(
		queryContactDetail,
		{
			variables: {
				id: favorites[0] || 0,
			},
		}
	)

	const getRestData = async () => {
		if (favorites.length >= favData.length) {
			if (resData?.contact_by_pk) {
				let concated: IContact[] = []
				if (favorites.length > 1) {
					const res = await Promise.all(
						favorites.map((fav) =>
							refetch({
								id: fav,
							})
						)
					)
					const mappedRes = res.map((r) => ({
						__typename: r?.data.contact_by_pk.__typename,
						created_at: r?.data.contact_by_pk.created_at,
						first_name: r?.data.contact_by_pk.first_name,
						last_name: r?.data.contact_by_pk.last_name,
						id: r?.data.contact_by_pk.id,
						phones: r?.data.contact_by_pk.phones,
					}))
					const temp = [...mappedRes]
					concated = temp
				} else {
					const mappedResData = {
						__typename: resData?.contact_by_pk.__typename,
						created_at: resData?.contact_by_pk.created_at,
						first_name: resData?.contact_by_pk.first_name,
						last_name: resData?.contact_by_pk.last_name,
						id: resData?.contact_by_pk.id,
						phones: resData?.contact_by_pk.phones,
					}
					concated = [mappedResData]
				}
				setFavData(concated)
			}
		} else {
			setFavData((prev) => prev.filter((f) => favorites.includes(f.id || 0)))
		}
	}

	useEffect(() => {
		getRestData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resData, favorites])

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
							textAlign: `center`,
						})
					)}
				>
					Your Favorite Contacts
				</p>
				<div
					css={{
						maxHeight: `60vh`,
						overflowY: `auto`,
						display: `grid`,
						gridTemplateColumns: 'auto',
						gap: theme.spacing[4],
					}}
				>
					{favData.map((doc, idx) => (
						<Card
							key={idx}
							data={doc}
							showDelete={showDelete}
							setShowDelete={() => setShowDelete({ show: true, data: doc })}
							showEdit={showEdit}
							setShowEdit={() => setShowEdit({ show: true, data: doc })}
							setFavorites={setFavorites}
							favorites={favorites}
						/>
					))}
				</div>
			</div>
		</Modal>
	)
}

export default FavoriteModal
