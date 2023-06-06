import { Test, TestingModule } from '@nestjs/testing';
import { FormationController } from './formation.controller';
import { FormationService } from './formation.service';

describe('FormationController', () => {
  let controller: FormationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationController],
      providers: [FormationService],
    }).compile();

    controller = module.get<FormationController>(FormationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
