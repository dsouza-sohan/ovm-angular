import { TestBed } from '@angular/core/testing';

import { BidModalService } from './bid-modal.service';

describe('BidModalService', () => {
  let service: BidModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
