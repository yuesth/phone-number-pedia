import { IconProps } from '@/interfaces/icon'

const IconX = ({ size, className, style }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="#ffffff"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			css={style}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 6l-12 12" />
			<path d="M6 6l12 12" />
		</svg>
	)
}

export default IconX
