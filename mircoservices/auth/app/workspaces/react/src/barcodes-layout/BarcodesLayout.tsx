import React, { useEffect } from 'react'
import { pipe } from 'fp-ts/lib/function'
import _ from 'lodash'
import { BarcodesLayoutProps } from './interfaces/BarcodesLayoutProps.interface'
import './index.scss'
import { useNavigateToResult } from '../barcode-app/hooks/useNavigateToResult'
import { useNavigate } from 'react-router-dom'

export interface BarcodeItemProps {
	barcodeBase64: string
	barcodeNumber: string
}

const BarcodeItem = (props: BarcodeItemProps) => {
	//номер накладной с пробелами
	const spacedBarcode = props.barcodeNumber
		.split('')
		.map((l, i) => (i === 5 ? l + ' ' : l))
		.map((l, i) => (i === 7 ? l + ' ' : l))
		.map((l, i) => (i === 12 ? l + ' ' : l))

	return (
		<div className="barcode">
			{/* <div></div> */}
			<img src={`data:image/png;base64,${props.barcodeBase64}`} />
			{spacedBarcode}
		</div>
	)
}

export const BarcodesLayout = (props: BarcodesLayoutProps) => {
	const navigate = useNavigate()
	const { barcodeItems, notches } = props

	console.log({ props })

	useEffect(() => {
		setTimeout(() => {
			window.print()
		}, 50)
	})

	window.onafterprint = (event) => {
		console.log({ event })
		navigate('/barcoder')
	}

	// window.onbeforeprint = (e) => {
	// 	navigate('/barcoder')
	// }

	const pp = _.chunk(barcodeItems, 60)

	return (
		<div className="root-div">
			{pp.map((part) => {
				console.log({ part })

				return (
					<div className="barcodes-layout">
						<div className="notches wrapper">
							{part.map((itemProps, index, array) => {
								const horizontalLeft = [
									4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56,
								]
								const horizontalRight = [
									7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59,
								]
								const verticalLeftTop = [1, 2]
								const verticalRightTop = [2]
								const verticalLeftBottom = [57, 58]
								const verticalRightBottom = [2]

								const horizontal = () => {
									if (horizontalLeft.some((v) => v === index)) {
										return '-left'
									} else if (horizontalRight.some((v) => v === index)) {
										return '-right'
									}
								}

								const vertical = () => {
									if (verticalLeftTop.some((v) => v === index)) {
										return '-left-top'
									} else if (verticalRightTop.some((v) => v === index)) {
										return '-right-top'
									} else if (verticalLeftBottom.some((v) => v === index)) {
										return '-left-bottom'
									}
									// else if (verticalRightBottom.some((v) => v === index)) {
									// 	return '-right-bottom'
									// }
								}

								// const horizontal=
								// const vertical

								return (
									<div>
										<div className={'horizontal-notch' + horizontal()}></div>
										<div className={'vertical-notch' + vertical()}></div>
									</div>
								)
							})}
						</div>

						<div className="wrapper">
							{part.map((itemProps) => (
								<BarcodeItem {...itemProps} />
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}
