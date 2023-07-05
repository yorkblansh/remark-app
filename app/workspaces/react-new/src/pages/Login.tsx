import { Button, Checkbox, Form, Input } from 'antd'
import { pipe } from 'fp-ts/es6/function'
import { login } from '../utils/login'

interface FormProps {
	username: string
	password: string
}

export const Login = () => {
	const onFinish = (values: FormProps) => {
		login()

		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className="height-100vh">
			<div className="wrapper bg-neutral-400">
				<div className="login-form">
					<h1>Log in</h1>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Username"
							name="username"
							rules={[
								{ required: true, message: 'Please input your username!' },
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}
