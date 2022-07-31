export default function ( plugins: PluginArray ): string[] {
	let temp: string[] = []

	Object.entries( plugins ).forEach( ( [ key, entry ] ) => {
		temp.push( entry.name )
	} )

	return temp
}