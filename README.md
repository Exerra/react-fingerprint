# react-fingerprint

Generate a fingerprint with one function call!

## Usage

```ts
import { getFingerprint, getRawFingerprint } from "react-fingerprint";
// const { getFingerprint, getRawFingerprint } = require("react-fingerprint") (cjs version)

const asyncFunc = async () => {
    let fingerprint = await getFingerprint() // fingerprint id
    let rawData = await getRawFingerprint() // raw data that is used to make the fingerprint
}
```

## ⚠️ Warning

This package relies entirely on browser APIs, so if you are using it with an SSR framework (example being Remix) then find a way to run it only client-side

Remix example
```js
import { getFingerprint } from "react-fingerprint"
import React, {useEffect} from "react"

export default function view() {
	useEffect(() => {
		(async () => { // as react-fingerprint returns promises, you will need to either wrap it in an async func or use .then()
			let fingerprint = await getFingerprint()
        })
    })
    
    return (
        <h1>whatever</h1>
    )
}
```