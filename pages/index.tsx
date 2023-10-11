import BaseLayout from '@/components/Common/BaseLayout'
import { useTheme } from '@emotion/react'

export default function Home() {
	const theme = useTheme()
	return (
		<BaseLayout>
			<p
				css={{
					fontSize: theme.fontSize['4xl'],
					textAlign: `center`,
				}}
			>
				Phone Number Pedia
			</p>
		</BaseLayout>
	)
}
