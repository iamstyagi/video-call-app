import { TestBed } from '@angular/core/testing';

import { WebChatService } from './web-chat.service';

describe('WebChatService', () => {
  let service: WebChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
