import React from 'react'
import _ from 'lodash'
import { FormPage } from '../../interfaces/FormPage.interface'
import { numberToWord } from '../../../../api/src/utils/numberToWord'
import { MailLogo } from './components/MailLogo'
import { getFormBarcodes } from '../../utils/getBarCodes'
import { useRpiNames } from '../../hooks/useRpiNames'

const NODE_ENV = process.env.NODE_ENV as 'development' | 'production'
const isDevMode = NODE_ENV === 'development'

export const form16Page: FormPage<'form16'> = ({
	currentPagePackages,
	type,
	formProps,
	pageNumber,
	formPackagesRanges,
}) => {
	const {
		// barcodeBase64,
		indexFrom,
		indexTo,
		barcode,
		sendType,
		sealNumber,
		packagesLength,
		datamatrixList,
	} = formProps

	// const { rpiNames } = useRpiNames()
	// console.log({ rpiNames })

	const { firstPageRange, middlePagesRange } = formPackagesRanges
	const isFirstPageLast = packagesLength <= firstPageRange

	const splittedPackges = _.chunk(currentPagePackages, 2)
	const barcodeBase64 = getFormBarcodes().barcode(Number(barcode.trim()))

	const datamatrixListDev = splittedPackges.map((pkg) =>
		getFormBarcodes({ devProps: { size: 'small' } }).datamatrix(pkg)
	)

	const datamatrixLeft = datamatrixListDev[0]
	const datamatrixRight = datamatrixListDev[1]

	//номер накладной с пробелами
	const spacedBarcode = barcode
		.split('')
		.map((l, i) => (i === 5 ? l + ' ' : l))
		.map((l, i) => (i === 7 ? l + ' ' : l))
		.map((l, i) => (i === 14 ? l + ' ' : l))

	return (
		<div className="layout">
			<header className="header">
				{/* LAY Header section left */}
				<section className="header__left">
					{type === 'first' ? (
						<div className="header__left__top">
							<div className="header__left__top__item-group">
								<div className="header__left__top__item-group-top">
									<div className="barcode">
										<img src={`data:image/png;base64,${barcodeBase64}`} />
										<label className="self-center font-mono">
											{spacedBarcode}
										</label>
									</div>
								</div>
								<div className="header__left__top__item-group-bottom">
									<div className="header__left__top__item-group-bottom__logo">
										<MailLogo />
									</div>
									<div className="header__left__top__item-group-bottom__index">
										<div className="text-center font-bold">Накладная</div>
										<div className="mt-2 flex w-full">
											<div>№</div>
											<div className="underline-long w-full text-center font-bold">
												{spacedBarcode}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* LAY datebox */}
							<div className="datebox">
								<div className="datebox__square">
									<div className="date">16.02.2023г</div>
									<div className="time">15:33:24</div>
									<div className="text-[17px] font-bold">291920</div>
									<div className="title">ЦОПП</div>
								</div>
								<div className="datebox__label">
									(дата и место <br /> формирования)
								</div>
							</div>
						</div>
					) : (
						<div className="barcode">
							<img src={`data:image/png;base64,${barcodeBase64}`} />
							<label className="self-center font-mono">{spacedBarcode}</label>
						</div>
					)}

					{/* LAY header left strokes
					строки под номером накладной в шапке */}
					{/* [:nth-child_&]:header__strokes${type} */}
					<div className={`header__strokes--${type}`}>
						{type === 'first' ? <div>на РПО, отправленные</div> : null}

						<div>
							<div>из</div>
							<div>
								<div className="underline-long"> {indexFrom} Луганск ЦОПП </div>
								<div className="underline-long"></div>
							</div>
						</div>
						<div>
							<div> в адрес </div>
							<div>
								<div className="underline-long">
									{indexTo} участок по обмену почтовых отправлений{' '}
								</div>
								<div className="underline-long"></div>
							</div>
						</div>

						<div className="header__strokes__more">
							<div className={`header__strokes__more__left--${type}`}>
								<div>
									<div>{sendType}</div>
								</div>
								<div>
									<div> № </div>
									<div>
										<div className="underline-long"></div>
									</div>
								</div>
								{type === 'first' ? (
									<div>
										<div> № пломбы </div>
										<div>
											<div className="underline-long">{sealNumber}</div>
										</div>
									</div>
								) : null}
							</div>
							{type === 'first' ? (
								<div className="header__strokes__more--right">Страховая</div>
							) : null}
						</div>
					</div>
				</section>

				{/* LAY Header section right */}
				<section
					className={[
						'header__right',
						`${type !== 'first' ? 'justify-between' : ''}`,
					].join(' ')}
				>
					<div className="header__right__text">
						<div className="form-literal text-right">ф.16</div>
						{type === 'first' ? (
							<div className="tac bold">Общий счет</div>
						) : null}
					</div>

					{type === 'first' ? (
						<table className="total-table">
							<tr>
								<td>
									Наименования <br /> почтовых отправлений
								</td>
								<td>Коли&shy;чество</td>
							</tr>
							<tr>
								<td>Посылка</td>
								<td>24</td>
							</tr>
							<tr>
								<td>Письмо</td>
								<td>2</td>
							</tr>
							<tr>
								<td>Итого</td>
								<td>26</td>
							</tr>
						</table>
					) : (
						<div className="flex flex-col gap-[4px] text-right">
							<div className="whitespace-nowrap">стр. {pageNumber}</div>
							<div className="datetime">
								<div>16.02.2023г</div>
								<div>15:33:24</div>
							</div>
						</div>
					)}
				</section>
			</header>

			<main>
				<div className="mt-2">
					<table className="items-table">
						<thead>
							<tr>
								<th>Наименование почтового отправления</th>
								<th>Идентификатор почтового отпр. или перевода</th>
								<th>Сумма объявленной ценности&nbsp;(руб.)</th>
								<th>Особые&nbsp;отметки</th>
								<th>Наименование почтового отправления</th>
								<th>Идентификатор почтового отпр. или перевода</th>
								<th>Сумма объявленной ценности&nbsp;(руб.)</th>
								<th>Особые&nbsp;отметки</th>
							</tr>
						</thead>

						<tbody>
							{splittedPackges.map((eachColumnPackages) => (
								<tr>
									{eachColumnPackages.map((pkg) => (
										<>
											<td>{pkg.rpiName}</td>
											<td>{pkg.rpiBarCode}</td>
											<td>{pkg.rpiValue}</td>
											<td>{pkg.rpiMark}</td>
										</>
									))}
								</tr>
							))}
						</tbody>
						{type === 'last' ? (
							<tfoot>
								<tr>
									<td className="fb">Итого</td>
									<td colSpan={3}>
										{packagesLength} ({numberToWord(packagesLength)})
									</td>
									<td className="fb" colSpan={2}>
										Вес брутто гр. РПО(кг.)
									</td>
									<td colSpan={2}>27,3</td>
								</tr>
							</tfoot>
						) : null}
					</table>
				</div>
			</main>

			<footer className="footer">
				<div className="footer__datamatrix--left">
					<div>
						{datamatrixLeft && (
							<img
								// height={size}
								src={`data:image/png;base64,${datamatrixLeft?.imgBase64}`}
								alt=""
							/>
						)}
					</div>
				</div>
				{type === 'last' || isFirstPageLast ? (
					<div className="footer__center">
						<div className="footer__center__strokes">
							<div className="footer__center__strokes__first">
								<div className="underline-long min-h-[30px] text-center"> </div>
								<div className="text-center font-mono text-[9px]">
									(Должность, подпись, ФИО)
								</div>
							</div>

							<div className="footer__center__strokes__second">
								<div className="flex">
									<div className="self-center font-mono text-[12px]">
										{' '}
										Принял{' '}
									</div>
									<div className="d-flex flex-column w-full ">
										<div className="underline-long min-h-[30px] text-center">
											{' '}
										</div>
										<div className="text-center font-mono text-[9px]">
											(Должность, подпись, ФИО)
										</div>
									</div>
								</div>
								<div className="font-mono text-[9px] italic">
									Распечатал(а): Администратор Овчаренко Н. Н.
									<br /> 05.04.2023 08:14; СортМастер, версия: 1.32.20
								</div>
							</div>
						</div>

						<div className="lastpage-stamp">
							<div className="box-stamp"></div>
							<div className="box-stamp-label">
								(Оттиск календарного <br /> почтового штемпеля <br /> места
								приема)
							</div>
						</div>
					</div>
				) : null}

				<div className="footer__datamatrix--right">
					<div>
						{datamatrixRight && (
							<img
								// height={size}
								src={`data:image/png;base64,${datamatrixRight.imgBase64}`}
								alt=""
							/>
						)}
					</div>
				</div>
			</footer>

			<div className="print-info">
				<div>Распечатано повторно: 19.01.2023 15:55 Pakulya A.</div>
				<div>СортМастер, версия 1.30.38</div>
			</div>
		</div>
	)
}
