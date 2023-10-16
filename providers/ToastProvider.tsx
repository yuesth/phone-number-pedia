import IconX from '@/components/Svg/IconX'
import { IToast, IToastContext } from '@/interfaces/toast'
import {
	marginHorizontalAuto,
	paddingHorizontal,
	paddingVertical,
} from '@/styles/common'
import { body } from '@/styles/typography'
import { css, useTheme } from '@emotion/react'
import { useRouter } from 'next/router'
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

const ToastContext = createContext<IToastContext>({
	showToast: { message: null, type: null },
	setShowToast: () => null,
	setShowToastWithTimeout: () => null,
})

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	const nodeRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<ReturnType<typeof setInterval>>()
	const theme = useTheme()

	const [showToast, setShowToast] = useState<IToast>({
		message: null,
		type: null,
	})

	useEffect(() => {
		router.events.on('routeChangeStart', dismissToast)
		return () => {
			router.events.off('routeChangeStart', dismissToast)
		}
	}, [router.events])

	const dismissToast = () => {
		setShowToast((_toast) => ({ ..._toast, type: null }))
	}

	const setShowToastWithTimeout = (toast: IToast, timeout: number) => {
		clearTimeout(timeoutRef.current)
		setShowToast(toast)
		timeoutRef.current = setTimeout(() => {
			dismissToast()
		}, timeout)
	}

	return (
		<>
			<ToastContext.Provider
				value={{
					showToast,
					setShowToast,
					setShowToastWithTimeout,
				}}
			>
				{showToast.type !== null && (
					<div
						ref={nodeRef}
						css={{
							top: 32,
							zIndex: 100,
							position: `fixed`,
							display: `flex`,
							width: `100%`,
						}}
					>
						<div
							css={css(
								marginHorizontalAuto(),
								paddingHorizontal(theme, 3),
								paddingVertical(theme, 2),
								{
									display: `flex`,
									alignItems: `center`,
									justifyContent: `center`,
									gap: theme.spacing[1],
									borderRadius: theme.rounded.lg,
									backgroundColor:
										showToast.type === 'success'
											? theme.colors.tone.positive
											: theme.colors.tone.negative,
								}
							)}
							style={{ boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.45)' }}
						>
							<p
								css={css(
									body(theme, {
										fontWeight: theme.fontWeight.bold,
										color: `white`,
									})
								)}
							>
								{showToast.type === 'error'
									? showToast.message || 'Something went wrong'
									: showToast.message}
							</p>
							<div
								css={{
									cursor: `pointer`,
								}}
								onClick={dismissToast}
							>
								<IconX
									size={20}
									style={{
										fill: `white`,
									}}
								/>{' '}
							</div>
						</div>
					</div>
				)}
				{children}
			</ToastContext.Provider>
		</>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)
	return context
}
