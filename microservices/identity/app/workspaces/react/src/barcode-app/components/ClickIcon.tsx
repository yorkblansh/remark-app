import React from 'react'

export function Icon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="transparent"
			viewBox="0 0 48 48"
		>
			<path fill="black" fillOpacity="0.01" d="M0 0H48V48H0z"></path>
			<path
				className="color-change"
				// stroke="#0958d9"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
				d="M11 44V15a4 4 0 018 0v20l23 5v4"
			></path>
			<path
				className="color-change"
				// stroke="#0958d9"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="4"
				d="M11 25.25v0C6.903 23.65 4 19.664 4 15 4 8.925 8.925 4 15 4s11 4.925 11 11c0 4.664-2.903 8.65-7 10.25"
			></path>
		</svg>
	)
}

export default Icon
