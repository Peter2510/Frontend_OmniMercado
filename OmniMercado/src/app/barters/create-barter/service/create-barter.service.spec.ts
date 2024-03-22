import { TestBed } from '@angular/core/testing';

import { CreateBarterService } from './create-barter.service';

describe('CreateBarterService', () => {
  let service: CreateBarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
