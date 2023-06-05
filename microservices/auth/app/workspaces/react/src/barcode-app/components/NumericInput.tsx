import { Form, Input, Tooltip, message } from 'antd'
import { useState } from 'react'

interface NumericInputProps {
	name: string
	style?: React.CSSProperties
	value: string
	onChange: (value: string) => void
	maxLength: number
	minLength: number
	validateStatus?: 'validating' | 'success' | 'warning' | 'error'
	message: string
	placeholder: string
	isCorrect: boolean
	onClick: () => any
	ref: any
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value)

export const NumericInput = (props: NumericInputProps) => {
	const [isPlaceHolder, setIsPlaceHolder] = useState(true)
	const { value, onChange, message, validateStatus } = props

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = e.target
		const reg = /^-?\d*(\.\d*)?$/
		if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
			onChange(inputValue)
		}
	}

	// '.' at the end or only '-' in the input box.
	const handleBlur = () => {
		setIsPlaceHolder(true)
		let valueTemp = value
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			valueTemp = value.slice(0, -1)
		}
		onChange(valueTemp.replace(/0*(\d+)/, '$1'))
	}

	const ost = 6 - value.length

	const title = value ? (
		<span className="numeric-input-title">
			{value !== '-' ? ' осталось ' + ost : '-'}
			{/* {value !== '-' ? formatNumber(Number(value)) : '-'} */}
		</span>
	) : (
		'Введите индекс'
	)

	return (
		<Form.Item
			// label="Введите индекс"
			// hasFeedback
			// labelCol={{ span: 24 }}
			style={{}}
			// wrapperCol={{ sm: 24 }}
			validateStatus={validateStatus}
			help={message}
		>
			<Tooltip
				trigger={['focus']}
				title={ost !== 0 ? title : null}
				placement="top"
				color="geekblue"
				overlayClassName="numeric-input"
			>
				<Input
					autoFocus
					autoComplete="off"
					formAction="form"
					name={props.name}
					onInput={(e) => {}}
					ref={props.ref}
					// size={'large'}
					style={{
						width: 180,
						height: '60px',
						fontSize: '40px',
						textAlign: 'center',
						borderWidth: props.isCorrect ? 2 : undefined,
						borderColor: props.isCorrect ? '#20b720' : undefined,
					}}
					{...props}
					onFocus={() => {
						setIsPlaceHolder(false)
					}}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={isPlaceHolder ? props.placeholder : null}
					maxLength={props.maxLength}
					minLength={props.minLength}
				/>
			</Tooltip>
		</Form.Item>
	)
}
