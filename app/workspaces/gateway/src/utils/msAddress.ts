export type microservices = 'files' | 'gateway' | 'identity'

export const msHttpAddress = (msName: microservices) =>
	`http://${msName}:${msPort(msName)}`

export const msPort = (msName: microservices) =>
	`${process.env[msName.toUpperCase() + '_PORT']}`
