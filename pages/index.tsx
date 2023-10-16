import Card from '@/components/Card/Card'
import BaseLayout from '@/components/Common/BaseLayout'
import Button from '@/components/Common/Button'
import Header from '@/components/Common/Header'
import InputText from '@/components/Common/InputText'
import AddModal from '@/components/Modal/AddModal'
import DeleteModal from '@/components/Modal/DeleteModal'
import EditModal from '@/components/Modal/EditModal'
import FavoriteModal from '@/components/Modal/FavoritesModal'
import IconChevronLeft from '@/components/Svg/IconChevronLeft'
import IconChevronRight from '@/components/Svg/IconChevronRight'
import Iconfavorite from '@/components/Svg/IconFavorite'
import IconLoading from '@/components/Svg/IconLoading'
import { CONTACT_LIST_LIMIT, FAVORITE_CONTACT_KEY } from '@/constants/contact'
import { ContactRes, IContact } from '@/interfaces/contact'
import { HomeModalProps } from '@/interfaces/home'
import { PhoneRes } from '@/interfaces/phone'
import { useToast } from '@/providers/ToastProvider'
import { ContactQueries } from '@/quries/contact'
import { marginVertical } from '@/styles/common'
import { body, label } from '@/styles/typography'
import { debounce, mq, updateLocalStorage } from '@/utils/common'
import { useLazyQuery, useQuery } from '@apollo/client'
import { css, useTheme } from '@emotion/react'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Home() {
	const { queryContactList, queryPhoneList } = ContactQueries()
	const { setShowToastWithTimeout } = useToast()
	const [searchLoading, setSearchLoading] = useState<boolean>(false)
	const theme = useTheme()
	const defaultModalProps: HomeModalProps = {
		show: false,
		data: undefined,
	}
	const [contactData, setContactData] = useState<IContact[]>([])
	const [favorites, setFavorites] = useState<number[]>([])
	const [contactDataBackup, setContactDataBackup] = useState<IContact[]>([])
	const [offset, setOffset] = useState<number>(0)
	const [favoriteModalProps, setFavoriteModalProps] =
		useState<HomeModalProps>(defaultModalProps)
	const [addModalProps, setAddModalProps] =
		useState<HomeModalProps>(defaultModalProps)
	const [deleteModalProps, setDeleteModalProps] =
		useState<HomeModalProps>(defaultModalProps)
	const [editModalProps, setEditModalProps] =
		useState<HomeModalProps>(defaultModalProps)

	const {
		refetch: refetchContactList,
		loading: loadingContactList,
		data: contactResData,
	} = useQuery<ContactRes>(queryContactList, {
		variables: {
			limit: CONTACT_LIST_LIMIT,
			offset,
		},
	})
	const isEndPage = (contactResData?.contact.length || 0) < CONTACT_LIST_LIMIT

	const [refetchPhoneList] = useLazyQuery<PhoneRes>(queryPhoneList)

	const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			if (e.target.value === '') {
				setContactData(contactDataBackup)
				setSearchLoading(false)
				return
			}
			const res = await refetchPhoneList({
				variables: {
					where: {
						contact: {
							first_name: {
								_like: `%${e.target.value}%`,
							},
						},
					},
				},
			})
			const mappedRestoContact: IContact[] =
				res.data?.phone.map((p) => ({
					id: p.contact.id,
					first_name: p.contact.first_name,
					last_name: p.contact.last_name,
					created_at: p.contact.created_at,
					__typename: p.contact.__typename,
					phones: [
						{
							number: p.number,
						},
					],
				})) || []
			setContactData(mappedRestoContact)
			setSearchLoading(false)
		} catch (error) {
			setShowToastWithTimeout(
				{
					message: 'Error to search contact, please try again',
					type: 'error',
				},
				3000
			)
			setSearchLoading(false)
		}
	}

	useEffect(() => {
		if (contactResData) {
			const parsed: number[] = JSON.parse(
				localStorage.getItem(FAVORITE_CONTACT_KEY) || '[]'
			)
			setContactData(contactResData.contact)
			setContactDataBackup(contactResData.contact)
			setFavorites(parsed)
			updateLocalStorage(FAVORITE_CONTACT_KEY, parsed)
		}
	}, [contactResData])

	useEffect(() => {
		if (contactResData) updateLocalStorage(FAVORITE_CONTACT_KEY, favorites)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [favorites])

	return (
		<BaseLayout>
			<Header />
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
						flexDirection: [`column`, `column`, `row`],
						flexWrap: `wrap`,
					})
				)}
			>
				<InputText
					placeholder="Search first name..."
					parentStyle={mq({
						width: [`100%`, `100%`, `75%`],
						marginRight: [0, theme.spacing[2]],
						marginBottom: [theme.spacing[2], theme.spacing[2], 0],
					})}
					name="search"
					onChange={(e) => {
						setSearchLoading(true)
						debounce(() => onSearch(e), 1000)
					}}
				/>
				<div
					css={css({
						flex: `1 1 0%`,
						display: `flex`,
						width: '100%',
						alignItems: `center`,
						gap: theme.spacing[2],
					})}
				>
					<Button
						color="primary"
						isFullWidth
						onClick={() => setAddModalProps({ show: true })}
					>
						Add Contact
					</Button>
					<div
						css={{
							border: `1px solid ${theme.colors.gray}`,
							borderRadius: theme.rounded.lg,
							padding: theme.spacing[3],
							display: `flex`,
							alignItems: `center`,
							justifyContent: `center`,
							cursor: `pointer`,
						}}
						onClick={() => setFavoriteModalProps({ show: true })}
					>
						<Iconfavorite
							size={16}
							style={{
								fill: theme.colors.info,
								marginRight: theme.spacing[1],
							}}
						/>
						<p
							css={css(
								label(theme, { color: `white` }),
								marginVertical(theme, 0)
							)}
						>
							{favorites.length}
						</p>
					</div>
				</div>
			</div>
			{loadingContactList || searchLoading ? (
				<div
					css={css({
						width: `100%`,
						height: `50vh`,
						display: `flex`,
						alignItems: `center`,
						justifyContent: `center`,
					})}
				>
					<IconLoading
						size={25}
						style={{
							fill: `white`,
						}}
					/>
				</div>
			) : (
				<>
					<div
						css={mq({
							display: 'grid',
							gridTemplateColumns: ['auto', 'auto auto'],
							gap: theme.spacing[4],
							maxHeight: `100vh`,
							overflowY: `auto`,
						})}
					>
						{contactData
							?.filter((c) => !favorites.includes(c.id || 0))
							.map((contact, idx) => {
								return (
									<Card
										key={idx}
										setShowDelete={() =>
											setDeleteModalProps({ show: true, data: contact })
										}
										showDelete={deleteModalProps.show}
										setShowEdit={() =>
											setEditModalProps({ show: true, data: contact })
										}
										showEdit={editModalProps.show}
										data={contact}
										setFavorites={setFavorites}
										favorites={favorites}
									/>
								)
							})}
					</div>
					<div
						css={{
							display: `flex`,
							width: `100%`,
							alignItems: `center`,
							gap: theme.spacing[6],
							justifyContent: `end`,
							flexWrap: `wrap`,
							marginTop: theme.spacing[6],
						}}
					>
						<div
							css={{
								display: `flex`,
								gap: theme.spacing[2],
								alignItems: `center`,
							}}
						>
							<IconChevronLeft
								size={20}
								style={{
									stroke: `white`,
									cursor: offset !== 0 ? 'pointer' : `not-allowed`,
								}}
								isDisabled={offset === 0}
								onClick={() => setOffset(offset - CONTACT_LIST_LIMIT)}
							/>
							<IconChevronRight
								size={24}
								style={{
									fill: `white`,
									cursor: !isEndPage ? 'pointer' : `not-allowed`,
								}}
								isDisabled={isEndPage}
								onClick={() => setOffset(offset + CONTACT_LIST_LIMIT)}
							/>
						</div>
						<p css={css(body(theme))}>
							{offset}-{(offset || 0) + CONTACT_LIST_LIMIT}
						</p>
					</div>
				</>
			)}
			<AddModal
				isOpen={addModalProps.show}
				onClose={() => setAddModalProps({ show: false })}
				refetch={refetchContactList}
				refetchPhoneList={refetchPhoneList}
				style={{
					zIndex: 30,
				}}
			/>
			<DeleteModal
				isOpen={deleteModalProps.show}
				onClose={() => setDeleteModalProps({ show: false })}
				data={deleteModalProps.data}
				refetch={refetchContactList}
				favorites={favorites}
				setFavorites={setFavorites}
				style={{
					zIndex: 30,
				}}
			/>
			<EditModal
				isOpen={editModalProps.show}
				onClose={() => setEditModalProps({ show: false })}
				data={editModalProps.data}
				refetch={refetchContactList}
				refetchPhoneList={refetchPhoneList}
				style={{
					zIndex: 30,
				}}
			/>
			<FavoriteModal
				isOpen={favoriteModalProps.show}
				onClose={() => setFavoriteModalProps({ show: false })}
				setShowDelete={setDeleteModalProps}
				showDelete={deleteModalProps.show}
				setShowEdit={setEditModalProps}
				showEdit={editModalProps.show}
				favorites={favorites}
				setFavorites={setFavorites}
			/>
		</BaseLayout>
	)
}
