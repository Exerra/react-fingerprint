export default function ( mimetypes: MimeTypeArray ): { description: string, type: string, suffixes: string }[] {
	let temp = []
	for (let mimetype of mimetypes) {
		temp.push( {
			description: mimetype.description,
			type: mimetype.type,
			suffixes: mimetype.suffixes
		} )
	}

	return temp
}