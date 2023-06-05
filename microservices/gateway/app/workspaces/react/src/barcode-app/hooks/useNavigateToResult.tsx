import { useNavigate } from 'react-router-dom'
import { BarcodesLayoutProps } from '../../barcodes-layout/interfaces/BarcodesLayoutProps.interface'

export const useNavigateToResult = () => {
	const navigate = useNavigate()

	return {
		navigatePassingProps: (props: BarcodesLayoutProps) =>
			navigate('/result', { state: props }),
	}
}
