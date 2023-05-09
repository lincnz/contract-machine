import { TestBed } from '@angular/core/testing';

import { GetObservableService } from './get-observable.service';

describe('GetObservableService', () => {
  let service: GetObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
