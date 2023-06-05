import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../barcodes-layout/index.scss'
// import { render } from 'solid-js/web'

import { BarcodeApp } from '../BarcodeApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BarcodeApp />
)
