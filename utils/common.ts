import facepaint from 'facepaint'

export const mq = (...obj: facepaint.Arg[]) => {
	const breakpoints = [768, 1024, 1280, 1536]
	const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`))
	return mq(obj)
}
