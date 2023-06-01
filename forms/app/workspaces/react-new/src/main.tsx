import React from 'react'
import ReactDOM from 'react-dom/client'
import { JsxFormsMap } from './@generated/JsxFormsMap'
import { pipe } from 'fp-ts/lib/function'
import { BarcodesLayout } from './barcodes-layout/BarcodesLayout'
import { barcodesLayoutProps } from './barcodes-layout/barcodesLayoutProps'
import { BarcodeApp } from './barcode-app/BarcodeApp'
import { App } from './App'

// const BARCODE_TEMPLATE = process.env.BARCODE_TEMPLATE as
// 	| 'layout-prod'
// 	| 'layout-dev'
// 	| 'app-dev'
// 	| 'app-prod'
// 	| undefined

// const NODE_ENV = process.env.NODE_ENV as 'development' | 'production'
// const FORM_NAME = process.env.FORM_NAME as keyof typeof JsxFormsMap

// const JsxBarcodeModesMap: {
// 	[each in typeof BARCODE_TEMPLATE]: React.ReactNode
// } = {
// 	'layout-dev': <BarcodesLayout {...barcodesLayoutProps} />,
// 	'layout-prod': <BarcodesLayout {...barcodesLayoutProps} />,
// 	'app-dev': <BarcodeApp />,
// 	'app-prod': <BarcodeApp />,
// }

// if (NODE_ENV === 'development') {
pipe(
	document.getElementById('root') as HTMLElement,
	ReactDOM.createRoot
).render(<App />)
// }
