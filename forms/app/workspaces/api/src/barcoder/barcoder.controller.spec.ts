import { Test, TestingModule } from '@nestjs/testing';
import { BarcoderController } from './barcoder.controller';
import { BarcoderService } from './barcoder.service';

describe('BarcoderController', () => {
  let controller: BarcoderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarcoderController],
      providers: [BarcoderService],
    }).compile();

    controller = module.get<BarcoderController>(BarcoderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
