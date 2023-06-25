export const Login = () => {
	return (
		<div className="height-100vh">
			<div className="wrapper bg-neutral-400">
				<div className="login-form">
					<h1>Log in</h1>

					<form id="login-form" action="" method="POST">
						<label>
							username:
							<input
								type="text"
								name="name"
								id="name"
								// placeholder="Илон Маск"
								required
							/>
						</label>
						<label>
							password:
							<input
								type="text"
								name="name"
								id="name"
								// placeholder="Илон Маск"
								required
							/>
						</label>
					</form>
				</div>
			</div>
		</div>
	)
}
