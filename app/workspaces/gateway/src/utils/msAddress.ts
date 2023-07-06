type microservices = 'files' | 'gateway' | 'identity'

const ports = {}

export const msAddress = (msName: microservices) => {
	return `http://${msName}:`
}
