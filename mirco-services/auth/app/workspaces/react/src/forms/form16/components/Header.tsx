import React from "react"
import { MailLogo } from "./MailLogo"



export interface HeaderProps {

}

export const Header = ({

}: HeaderProps) => {
	return (
		<header style={{ marginTop: '78px' }}>
			<div className="row">
				<div className="mr-2">Из</div>
				<div className="underline">344962 участок по обмену почтовых отправлений</div>
			</div>
			<div className="row mt-1">
				<div className="mr-2">В адресс</div>
				<div className="underline">344962 участок по обмену почтовых отправлений</div>
			</div>
			<div className="row mt-1"> Группа РПО </div>

			<div className="page-info">
				<div className="page">стр. 3</div>
				<div className="date">19.02.2023</div>
				<div className="time">05:42:32</div>
			</div>
		</header>
	)
}
