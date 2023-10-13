import { IconProps } from '@/interfaces/icon'

const IconChevronLeft = ({
	size,
	className,
	onClick,
	style,
	isDisabled,
}: IconProps) => {
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
			onClick={() => !isDisabled && onClick?.()}
		>
			<path stroke="none" d="M0 0h24v24H0z" />
			<path d="M15 6l-6 6l6 6" />
		</svg>
	)
}

export default IconChevronLeft
