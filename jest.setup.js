import '@testing-library/jest-dom'

// eslint-disable-next-line no-undef
jest.mock('next/router', () => ({
	useRouter() {
		return {
			route: '/',
			pathname: '',
			query: '',
			asPath: '',
		}
	},
}))
