import { Test, TestingModule } from '@nestjs/testing';
import { BarcoderService } from './barcoder.service';

describe('BarcoderService', () => {
  let service: BarcoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarcoderService],
    }).compile();

    service = module.get<BarcoderService>(BarcoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
