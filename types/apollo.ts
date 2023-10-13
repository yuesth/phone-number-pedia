import { ApolloQueryResult, OperationVariables } from '@apollo/client'

export type TRefetch<T> = (
	// eslint-disable-next-line no-unused-vars
	variables?: Partial<OperationVariables> | undefined
) => Promise<ApolloQueryResult<T>>
