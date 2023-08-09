import React, { useEffect, useState } from 'react'
import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
	useNavigate,
	useSearchParams,
} from 'react-router-dom'
import {
	BarcodeItemProps,
	BarcodesLayout,
} from '../barcodes-layout/BarcodesLayout'
import { useBarcodeItems } from './hooks/useBarcodeItems'
import { useFocus } from './hooks/useFocus'
import { useNavigateToResult } from './hooks/useNavigateToResult'
import {
	Button,
	Checkbox,
	Form,
	Input,
	Select,
	InputNumber,
	Tooltip,
	Collapse,
	Divider,
	Radio,
	Space,
} from 'antd'
import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { NumericInput } from './components/NumericInput'
import {} from '@ant-design/icons'
import { pipe } from 'fp-ts/lib/function'
import { getDepartmentInfo } from './utils/getDepartmentInfo'
import { getBarcodeRange } from './utils/getBarcodeRange'
import { getBarcodeImageBase64 } from './utils/getBarcodeImageBase64'
import { PostOfficeCenterPopup } from './components/PostOfficeInfoPopup'
import ClickIcon from './components/ClickIcon'
import { DepartmentInfo } from './interface/department.response.interface'

type IndexState = 'open' | 'closed' | 'not_exist'

const BarcodeForm = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	console.log({ QUERY: searchParams.get('kkey') })
	const [inputRef, setInputFocus] = useFocus()

	const { Panel } = Collapse

	useEffect(() => {
		window.addEventListener('keypress', (e) => {
			console.log(e)
			setInputFocus()
		})
	}, [])

	const [region, setResgion] = useState<undefined | string>(undefined)
	const [enabled, setEnabled] = useState<undefined | number>(undefined)
	const [address, setAddress] = useState<undefined | string>(undefined)
	const [postOfficeCenter, setPostOfficeCenter] = useState<undefined | string>(
		undefined
	)
	const [isIndexValid, setIsIndexValid] = useState<undefined | IndexState>(
		undefined
	)
	const [indexInput, setIndexInput] = useState('')
	const { navigatePassingProps } = useNavigateToResult()

	// if (indexInput.length !== 6 && isIndexValid !== undefined) {
	// 	setIsIndexValid(undefined)
	// }
	if (indexInput.length === 6) {
		getDepartmentInfo(indexInput).then((di) => {
			if (di === undefined) {
				setIsIndexValid('not_exist')
			} else {
				console.log({ di: di })
				setResgion(di.region)
				setEnabled(di.enabled)
				setAddress(di.address)
				setPostOfficeCenter(di.postoffice_center)
				// setDepartmentInfo(di)

				di.enabled === 1
					? setIsIndexValid('open')
					: di.enabled === 0
					? setIsIndexValid('closed')
					: setIsIndexValid(undefined)
			}
		})
	} else if (indexInput.length !== 6 && isIndexValid !== undefined) {
		setIsIndexValid(undefined)
		setPostOfficeCenter(undefined)
	}

	console.log({ indexInput })

	const onFinish = async (values: {
		barcodesOnPage: string
		pageAmount: number
		notches: boolean
	}) => {
		const { barcodesOnPage, pageAmount, notches } = values
		const numericBarcodesOnPage = pipe(barcodesOnPage.split(' ')[0], Number)
		const barcodeRange = await getBarcodeRange(
			indexInput,
			numericBarcodesOnPage * pageAmount
		)
		const barcodeImageBase64 = await getBarcodeImageBase64(barcodeRange)
		// console.log({
		// 	barcodeImageBase64,
		// })
		// const barcodeItems: BarcodeItemProps[] = await 1Promise.all(
		// 	barcodeRange.map(async (barcodeNumber) => ({
		// 		barcodeBase64,
		// 		barcodeNumber,
		// 	}))
		// )

		// await getBarcodeImageBase64(barcodeRange)
		// console.log({
		// 	barcodeItems: barcodeItems.filter(
		// 		(p) => p.barcodeBase64 !== undefined
		// 	) as BarcodeItemProps[],
		// })

		const barcodeItems = barcodeImageBase64.map((o) => ({
			barcodeBase64: o.barcodeImageBase64,
			barcodeNumber: o.barcodeNumber,
		}))

		console.log({ barcodeItems })

		navigatePassingProps({
			barcodeItems,
			notches,
		})
		console.log('Success:', values)
		// document.getElementsByName('index')
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className="app">
			<br />
			<br />

			<Collapse
				style={{
					backgroundColor: '#efefef',
					borderRadius: '5px',
					borderTopRightRadius: '5px',
					padding: '0px',
				}}
				size="small"
				ghost
				expandIconPosition="start"
				className={[
					postOfficeCenter ? 'ourproductsleft-show' : 'ourproductsleft',
					// 'ourproductsleft',
				].join(' ')}
				bordered={false}
				// defaultActiveKey={['1']}
				expandIcon={({ isActive }) => (
					<CaretRightOutlined rotate={isActive ? 90 : 0} />
				)}
			>
				<Panel className="select-none" header={postOfficeCenter} key="1">
					<p>{address}</p>
					<Divider style={{ margin: '0px' }} />
					<p>Регион: {region}</p>
					<Divider style={{ margin: '0px' }} />
					<p>{enabled === 1 ? 'отделение работает' : 'отделение закрыто'}</p>
				</Panel>
			</Collapse>

			<br />
			<NumericInput
				isCorrect={isIndexValid === 'open'}
				placeholder="ИНДЕКС"
				message={
					isIndexValid === undefined
						? ''
						: isIndexValid === 'open'
						? 'Индекс корректен'
						: isIndexValid === 'closed'
						? 'Отделение не работает'
						: 'Отделение не найдено'
				}
				validateStatus={
					isIndexValid === undefined
						? undefined
						: isIndexValid === 'open'
						? 'success'
						: isIndexValid === 'not_exist'
						? 'error'
						: 'warning'
				}
				maxLength={6}
				minLength={6}
				name="index"
				ref={inputRef}
				onClick={setInputFocus}
				onChange={setIndexInput}
				value={indexInput}
			/>

			<Form
				name="form"
				labelCol={{ span: 24 }}
				// size="large"
				// wrapperCol={{ span: 15,sm:'' }}
				style={{ width: 300 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Количество баркодов на странице"
					name="barcodesOnPage"
					style={{ marginBottom: 10 }}
					// wrapperCol={{ sm: 24 }}
					required
					initialValue="60 штук (4*15)"
				>
					<Select size="large">
						<Select.Option value="60 штук (4*15)">60 штук (4*15)</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					style={{ marginBottom: 15 }}
					label="Всего страниц"
					name="pageAmount"
					rules={[{ required: true, message: 'Введите колличество страниц' }]}
				>
					<InputNumber size="large" maxLength={3} />
				</Form.Item>

				{/* <Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item> */}

				<Form.Item
					name="notches"
					valuePropName="checked"
					label="Засечки"
					style={{ marginBottom: 35 }}
					rules={[{ required: true, message: 'Определите засечки' }]}

					// wrapperCol={{ offset: 8, span: 16 }}
				>
					<Radio.Group>
						<Space direction="vertical">
							<Radio value={1}>С засечками</Radio>
							<Radio value={2}>Без засечек</Radio>
						</Space>
					</Radio.Group>
					{/* <Checkbox>Печатать засечки</Checkbox> */}
				</Form.Item>

				<Form.Item
					className="123"
					// style={{ display: 'flex', }}
					// wrapperCol={{ offset: 10, span: 16 }}
				>
					<Button
						disabled={isIndexValid !== 'open'}
						type="primary"
						// color="forestgreen"
						style={{
							width: '-webkit-fill-available',
							backgroundColor:
								isIndexValid === 'open' ? 'forestgreen' : undefined,
						}}
						size="large"
						htmlType="submit"
					>
						Подготовить к печати
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

const Result = () => {
	const { barcodeItems, notches } = useBarcodeItems()

	return (
		<div>
			<BarcodesLayout {...{ barcodeItems, notches }} />
		</div>
	)
}

const router = createBrowserRouter([
	{
		path: '/barcoder',
		element: <BarcodeForm />,
	},
	{ path: '/result', element: <Result /> },
])

export const BarcodeApp = () => {
	return <RouterProvider router={router} />
}
