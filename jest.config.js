const nextJest = require('next/jest')

const createJestConfig = nextJest({
	dir: './',
})

const customJestConfig = {
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jest-environment-jsdom',
	moduleDirectories: ['node_modules', '<rootDir>'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
}

module.exports = async () => ({
	...(await createJestConfig(customJestConfig)()),
})
