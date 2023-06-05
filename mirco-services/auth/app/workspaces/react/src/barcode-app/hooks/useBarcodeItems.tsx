import { useLocation } from 'react-router-dom'
import { BarcodesLayoutProps } from '../../barcodes-layout/interfaces/BarcodesLayoutProps.interface'

export const useBarcodeItems = () => {
	const { state } = useLocation()
	const barcodesLayoutProps = state as BarcodesLayoutProps
	const barcodeItems = barcodesLayoutProps.barcodeItems
	const notches = barcodesLayoutProps.notches

	return { barcodeItems, notches }
}
