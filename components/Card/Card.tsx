import { buttonCard, card } from '@/styles/card'
import { body, title1 } from '@/styles/typography'
import { css, useTheme } from '@emotion/react'
import Button from '../Common/Button'
import { mq, prettyTruncate } from '@/utils/common'
import { CardProps } from '@/interfaces/card'
import Iconfavorite from '../Svg/IconFavorite'

const Card = (props: CardProps) => {
	const theme = useTheme()
	const isFavorite = props.favorites.includes(props.data.id || 0)

	return (
		<div css={css(card(theme))}>
			<div>
				<p css={title1(theme)}>
					{prettyTruncate(
						props.data.first_name + ' ' + props.data.last_name || '',
						25
					)}
				</p>
				<p css={body(theme)}>{props.data.phones?.[0].number}</p>
			</div>
			<div css={buttonCard()}>
				<div>
					<Iconfavorite
						size={20}
						style={css(
							{
								stroke: !props.favorites.includes(props.data.id || 0)
									? `white`
									: `transparent`,
								fill: props.favorites.includes(props.data.id || 0)
									? theme.colors.info
									: `transparent`,
								cursor: `pointer`,
							},
							mq({
								marginRight: [0, theme.spacing[2]],
								marginBottom: [theme.spacing[2], 0],
							})
						)}
						onClick={() =>
							props.setFavorites((prev) =>
								isFavorite
									? prev.filter((f) => f !== props.data.id)
									: [...prev, props.data.id || 0]
							)
						}
					/>
				</div>
				<Button color="plain" onClick={() => props.setShowEdit()} isFullWidth>
					Edit
				</Button>
				<Button
					color="danger"
					isFullWidth
					onClick={() => props.setShowDelete()}
					style={mq({
						marginLeft: [0, theme.spacing[2]],
						marginTop: [theme.spacing[2], 0],
					})}
				>
					Delete
				</Button>
			</div>
		</div>
	)
}

export default Card
