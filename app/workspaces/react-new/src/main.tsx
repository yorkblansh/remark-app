import React from 'react'
import ReactDOM from 'react-dom/client'
import { pipe } from 'fp-ts/lib/function'
import { App } from './App'
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from 'react-router-dom'
import { Login } from './pages/Login'
import './index.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<div>
				<h1>Hello World</h1>
				<Link to="about">About Us</Link>
			</div>
		),
	},
	{
		path: 'about',
		element: <div>About</div>,
	},
	{
		path: 'login',
		element: <Login />,
	},
])

pipe(
	document.getElementById('root') as HTMLElement,
	ReactDOM.createRoot,
	(root) => root.render(<RouterProvider router={router} />)
)
