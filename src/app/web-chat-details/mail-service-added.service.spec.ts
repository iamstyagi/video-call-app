import { TestBed } from '@angular/core/testing';

import { MailServiceAddedService } from './mail-service-added.service';

describe('MailServiceAddedService', () => {
  let service: MailServiceAddedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailServiceAddedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
