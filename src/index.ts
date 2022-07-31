import getBrowserInfo from "./sources/browser";
import getTimezoneInfo from "./sources/timezone";
import canvas from "./sources/canvas";
import { encode } from "./utils/hash";
import getDeviceInfo from "./sources/device";
import fonts from "./sources/fonts";
import audio from "./sources/audio";
import webgl from "./sources/webgl";
import contrast from "./sources/contrast";
import color_gamut from "./sources/color_gamut";
import forced_colors from "./sources/forced_colors";
import hdr from "./sources/hdr";
import monochrome from "./sources/monochrome";
import reducedMotion from "./sources/reducedMotion";
import math from "./sources/math";

interface RawFingerprintData {
	browser: {
		vendor: string,
		app: {
			codename: string,
			name: string
		},
		product: {
			name: string,
			sub: string
		},
		language: {
			current: string,
			list: readonly string[]
		},
		userAgent: string,
		plugins: string[],
		capabilities: {
			contacts: boolean,
			pdfViewer: boolean,
			cookies: boolean
		},
		mimeTypes: {description: string, type: string, suffixes: string}[],
		canvas: string,
		bars: {
			menubar: boolean,
			personalbar: boolean,
			statusbar: boolean,
			toolbar: boolean
		},
		doNotTrack: string
	},
	device: {
		touchscreen: boolean,
		cpu: {
			name: string,
			cores: number
		},
		sizes: {
			usable: {
				height: number,
				width: number
			},
			screen: {
				height: number,
				width: number
			}
		},
		memory: number,
		color: {
			depth: number,
			contrast: string,
			gamut: string,
			forcedColors: boolean,
			hdr: boolean,
			monochromeDepth: number
		},
	},
	timezone: number,
	audio: {
		duration: number,
		length: number,
		numberOfChannels: number,
		sampleRate: number
	} | string,
	webgl: {
		vendor: number,
		renderer: number
	},
	reducedMotion: boolean,
	math: {
		acos: number,
		acosh: number,
		acoshPf: number,
		asin: number,
		asinh: number,
		asinhPf: number,
		atanh: number,
		atanhPf: number,
		atan: number,
		sin: number,
		sinh: number,
		sinhPf: number,
		cos: number,
		cosh: number,
		coshPf: number,
		tan: number,
		tanh: number,
		tanhPf: number,
		exp: number,
		expm1: number,
		expm1Pf: number,
		log1p: number,
		log1pPf: number,
		powPI: number
	},
	fonts: string[]
}

export const getRawFingerprint = async (): Promise<RawFingerprintData>  => {
	let browser = await getBrowserInfo()
	let timezone = getTimezoneInfo()
	let device = getDeviceInfo()

	browser.canvas = canvas()

	// --- Colours ---
	device.color.contrast = contrast()
	device.color.gamut = color_gamut()
	device.color.forcedColors = forced_colors()
	device.color.hdr = hdr()
	device.color.monochromeDepth = monochrome()

	return {
		browser,
		device,
		timezone,
		audio: await audio(),
		webgl: webgl(),
		reducedMotion: reducedMotion(),
		math: math(),
		fonts: await fonts()
	}
}

export const getFingerprint = async (): Promise<string> => {
	let raw = await getRawFingerprint()
	return await encode(raw)
}