import { buttonCard, card } from '@/styles/card'
import { body, title1 } from '@/styles/typography'
import { css, useTheme } from '@emotion/react'
import Button from '../Common/Button'
import { mq } from '@/utils/common'
import { CardProps } from '@/interfaces/card'

const Card = (props: CardProps) => {
	const theme = useTheme()
	return (
		<div css={css(card(theme))}>
			<div>
				<p css={title1(theme)}>Amin Aminudin</p>
				<p css={body(theme)}>08821919198</p>
			</div>
			<div css={buttonCard()}>
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
