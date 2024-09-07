import { TestBed } from '@angular/core/testing';

import { MywebrtcDetailsService } from './mywebrtc-details.service';

describe('MywebrtcDetailsService', () => {
  let service: MywebrtcDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MywebrtcDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
