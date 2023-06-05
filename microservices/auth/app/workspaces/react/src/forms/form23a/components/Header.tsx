import React from "react"



export interface HeaderProps {
	maintainer: string
	form_81: string
	seal_number: string
	vechicle_number: string
	transporter: string
}

export const Header = ({
	form_81,
	maintainer,
	seal_number,
	transporter,
	vechicle_number,
}: HeaderProps) => {
	return (
		<header>
			<div className="left">
				<div className="barcode">
					<img id="barcode" />
				</div>
				<div className="company-label">
					<img
						src="./imgs/pochta_rus.png"
						alt="почта россии лого"
						width="85"
						height="50"
					/>
				</div>
			</div>

			<div className="middle-info">
				<p>Почта отправлена в 11 час. 5 минут.</p>
				<p>В сопровождении:{maintainer}</p>
				<p>№ удостоверения ф.81: {form_81}</p>
				<p>№ пломбы: {seal_number}</p>
				<p>Номер т/с: {vechicle_number}</p>
				<p>Перевозчик: {transporter}</p>
			</div>

			<div className="date-stamp">
				<div>
					<div className="rectangle"></div>
					<div className="description">
						(дата и место формирования)
					</div>
				</div>
			</div>
		</header>
	)
}
