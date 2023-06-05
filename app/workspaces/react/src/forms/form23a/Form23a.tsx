import React from 'react'
import { MailLogo } from './components/MailLogo'
import { Form23AInterface } from '../../@generated/interfaces/form23a.interface'

export const Form23a = ({
	maintainer,
	form_81,
	seal_number,
	vechicle_number,
	transporter,
	invoice_number,
	outcome_mail_index,
	income_mail_index,
	income_mail_adress,
	postal_capacity_index,
	noc,
	total_capacities,
	total_registered_mail_sent_openly,
	noc_sum,
	total_capacities_sum,
	total_registered_mail_sent_openly_sum,
	barcodeBase64,
	dataMatrixBase64,
}: Form23AInterface) => {
	return (
		<div className="App">
			<header>
				<div className="left">
					<div className="barcode">
						{/* <img
							style={{
								width: 180,
								height: 35,
							}}
							id="barcode"
						/> */}
						<img
							style={{
								width: 180,
								height: 35,
							}}
							// https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html
							src={`data:image/png;base64,${barcodeBase64}`}
							alt=""
						/>
						<div className="numbers">{outcome_mail_index}</div>
					</div>

					<div className="underbarcode">
						<div className="company-label">
							<MailLogo />
							{/* <img
							src="/imgs/pochta_rus.png"
							alt="почта россии лого"
							width="85"
							height="50"
						/> */}
						</div>

						<div className="info">
							<p>Почта отправлена в 11 час. 5 минут.</p>
							<p>В сопровождении:{maintainer}</p>
							<p>№ удостоверения ф.81: {form_81}</p>
							<p>№ пломбы: {seal_number}</p>
							<p>Номер т/с: {vechicle_number}</p>
							<p>Перевозчик: {transporter}</p>
						</div>
					</div>
				</div>

				<div className="date-stamp">
					<div>
						<div className="rectangle"></div>
						<div className="description">(дата и место формирования)</div>
					</div>
				</div>
			</header>

			<main>
				<p className="tnr-bold">
					<b>
						НАКЛАДНАЯ № <u>{invoice_number}</u>
					</b>
				</p>
				<p>на почтовые емкости, отправленные</p>
				<p>
					Из{' '}
					<b>
						<u className="tnr-bold">
							{outcome_mail_index} участок по обменту почтовых отпаравлений
						</u>
					</b>
				</p>
				<p>
					В адрес{' '}
					<b>
						<u className="tnr-bold">
							{income_mail_index} {income_mail_adress}
						</u>
					</b>
				</p>
				<div className="container">
					{/* <!-- левый столбец --> */}
					<div style={{ flexDirection: 'column' }} className="wide-column">
						<p style={{ margin: '0px' }}>ОПС назначения</p>
						<p style={{ margin: '5px 0px 0px 0px' }}>
							Номер(Идентификатор) <br />
							накладной ф. 23/16а
						</p>
					</div>
					<div>
						<p>
							0 {income_mail_index} 0 {income_mail_adress}
						</p>
						<p>0 {postal_capacity_index}</p>
					</div>
					<div>ИТОГО</div>

					{/*<!-- группа срепдних столбцов -->*/}
					<div className="wide-row">КОЛИЧЕСТВО ЕМКОСТЕЙ</div>

					<div>С отпр. 1-го кл</div>
					<div>{noc.from_first_kilogram_departure}</div>
					<div>{noc_sum.from_first_kilogram_departure}</div>

					<div>EMS</div>
					<div>{noc.ems}</div>
					<div>{noc_sum.ems}</div>

					<div>Правительственные</div>
					<div>{noc.government}</div>
					<div>{noc_sum.government}</div>

					<div>Международные</div>
					<div>{noc.international}</div>
					<div>{noc_sum.international}</div>

					<div>Страховые</div>
					<div>{noc.insurance}</div>
					<div>{noc_sum.insurance}</div>

					<div>С заказной корр.</div>
					<div>{noc.from_registered_correspondence}</div>
					<div>{noc_sum.from_registered_correspondence}</div>

					<div>С простой корр.</div>
					<div>{noc.with_simple_correspondence}</div>
					<div>{noc_sum.with_simple_correspondence}</div>

					<div>Вес (кг)</div>
					<div>{noc.weight}</div>
					<div>{noc_sum.weight}</div>

					<div>С печатью</div>
					<div>{noc.with_stamp}</div>
					<div>{noc_sum.with_stamp}</div>

					<div>Порожняя тара</div>
					<div>{noc.empty_containers}</div>
					<div>{noc_sum.empty_containers}</div>

					<div>Группа РПО</div>
					<div>{noc.registered_mail_group}</div>
					<div>{noc_sum.registered_mail_group}</div>

					<div className="wide-column">
						<p>Всего емкостей</p>
					</div>
					<div>{total_capacities}</div>
					<div>{total_capacities_sum}</div>

					<div className="wide-column">Всего РПО пересылаемых открыто</div>
					<div>{total_registered_mail_sent_openly}</div>
					<div>{total_registered_mail_sent_openly_sum}</div>
				</div>
				<div className="amount-string">
					<b>Итого емкостей 1 (один), 1(один) отправлений</b>
				</div>
			</main>

			<footer>
				<div className="qrcode">
					<img src={`data:image/png;base64,${dataMatrixBase64}`} alt="" />

					{/* <canvas id="qrcode"></canvas> */}
				</div>
				<div className="signatures">
					<p></p>
					<p>принял</p>
					<p>
						Распечатал(а): Администратор Малыхина Н.А., 10.01.2023г. 11:05:33
					</p>
					<p>СортМастер, версия 1.30.38</p>
				</div>
				<div className="checkpoint"></div>
			</footer>
		</div>
	)
}

// renderBarCode("#barcode", "3449627910056598") //3449627910056598
