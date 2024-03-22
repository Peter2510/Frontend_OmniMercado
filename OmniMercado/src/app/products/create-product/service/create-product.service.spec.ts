import { TestBed } from '@angular/core/testing';

import { CreateSaleService } from './create-product.service';

describe('CreateSaleService', () => {
  let service: CreateSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
