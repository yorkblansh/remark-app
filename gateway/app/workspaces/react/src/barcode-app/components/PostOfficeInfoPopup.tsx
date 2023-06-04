import { Popover } from 'antd'
import { DepartmentInfo } from '../interface/department.response.interface'
import { useEffect, useState } from 'react'

const text = <span>Title</span>

const Content = (
	props: Pick<DepartmentInfo, 'address' | 'region' | 'enabled'>
) => {
	const { address, enabled, region } = props

	return (
		<div className="postoffice-popup-text">
			<p>отделение {enabled === 1 ? 'работает' : 'закрыто'}</p>
			<p>адрес: {address}</p>
			<p>регион: {region}</p>
		</div>
	)
}

interface Props {
	children: React.ReactNode
}

export const PostOfficeCenterPopup = (
	props: Props & Pick<DepartmentInfo, 'address' | 'region' | 'enabled'>
) => {
	console.log({ props })
	const { children, ...rest } = props

	return (
		<Popover
			placement="right"
			// title={text}
			content={Content(rest)}
			trigger="click"
		>
			{children}
		</Popover>
	)
}
