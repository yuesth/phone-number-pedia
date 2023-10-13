import { IconProps } from '@/interfaces/icon'

const IconPlus = ({ size, className, style, onClick }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			css={style}
			onClick={onClick}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 5l0 14" />
			<path d="M5 12l14 0" />
		</svg>
	)
}

export default IconPlus
