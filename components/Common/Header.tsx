import Head from 'next/head'

const Header = ({
	title = 'Phone Number Pedia',
	description = 'Saved your favorite phone number',
	keywords = 'react, next, emotion, jest, rtl, graphql',
	image = 'https://res.cloudinary.com/imagestorageyues/image/upload/v1697423038/k87S0gss_400x400_1_lb1708.png',
	url = 'https://phone-number-pedia.vercel.app/',
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@ArkanaGG" />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:site_name" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={image} />
		</Head>
	)
}

export default Header
