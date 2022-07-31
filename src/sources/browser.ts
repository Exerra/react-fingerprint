import parseMimetypes from "../utils/parseMimetypes";
import parsePlugins from "../utils/parsePlugins";

export default async function () {
	let nav = window.navigator

	return {
		vendor: nav.vendor || "",
		app: {
			codename: nav.appCodeName,
			name: nav.appName,
		},
		product: {
			name: nav.product,
			sub: nav.productSub
		},
		language: {
			current: nav.language,
			list: nav.languages
		},
		userAgent: nav.userAgent,
		plugins: parsePlugins( nav.plugins ),
		capabilities: {
			contacts: 'contacts' in navigator && 'ContactsManager' in window,
			pdfViewer: nav.pdfViewerEnabled || false,
			cookies: nav.cookieEnabled || false
		},
		mimeTypes: parseMimetypes( nav.mimeTypes ) || [],
		canvas: "",
		bars: {
			menubar: window.menubar.visible || false,
			personalbar: window.personalbar.visible || false,
			statusbar: window.statusbar.visible || false,
			toolbar: window.toolbar.visible || false
		},
		doNotTrack: nav.doNotTrack || "NC"
	}
}