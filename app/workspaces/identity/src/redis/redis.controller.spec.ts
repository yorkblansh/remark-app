import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './redis.controller'
import { RedisService } from './redis.service'

describe('GenpdfController', () => {
	let controller: AuthController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [RedisService],
		}).compile()

		controller = module.get<AuthController>(AuthController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
