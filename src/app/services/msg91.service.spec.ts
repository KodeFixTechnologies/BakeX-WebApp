import { TestBed } from '@angular/core/testing';

import { Msg91Service } from './msg91.service';

describe('Msg91Service', () => {
  let service: Msg91Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Msg91Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
