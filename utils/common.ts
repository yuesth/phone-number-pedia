import facepaint from 'facepaint'

export const mq = (...obj: facepaint.Arg[]) => {
	const breakpoints = [768, 1024, 1280, 1536]
	const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`))
	return mq(obj)
}

export const prettyTruncate = (str = '', len = 8) => {
	if (str && str.length > len) return `${str.slice(0, len)}...`
	return str
}

export const debounce = (func: Function, timeout: number = 1000) => {
	let timer
	clearTimeout(timer)
	timer = setTimeout(() => {
		func.apply(this)
	}, timeout)
}

export const updateLocalStorage = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}
