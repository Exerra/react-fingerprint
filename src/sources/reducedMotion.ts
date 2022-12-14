export default function (): boolean {
	if (doesMatch( 'reduce' )) {
		return true
	}
	if (doesMatch( 'no-preference' )) {
		return false
	}
	return false
}

const doesMatch = ( value: string ) => {
	return matchMedia( `(prefers-reduced-motion: ${value})` ).matches
}