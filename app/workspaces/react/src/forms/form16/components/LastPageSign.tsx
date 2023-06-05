import React from "react"

export interface LastPageSignProps {

}

export const LastPageSign = ({

}: LastPageSignProps) => {
	return (
		<div className="last-page-sign-row">
			<div className="data">
				<div className="underline tac" >
					{" "}
					
				</div>
				<div className="underline-text">
					(Должность, подпись, ФИО)
				</div>

				<div className="mt-2 d-flex" >
					<div> Принял </div>
					<div className="d-flex flex-column col">
						<div className="underline"></div>
						<div className="underline-text">
							(Должность, подпись, ФИО)
						</div>
					</div>
				</div>
			</div>

			<div className="stamp">
				<div className="box-stamp"></div>
				<div className="box-stamp-label">
					(Оттиск календарного <br /> почтового штемпеля{" "}
					<br /> места приема)
				</div>
			</div>
		</div>
	)
}
