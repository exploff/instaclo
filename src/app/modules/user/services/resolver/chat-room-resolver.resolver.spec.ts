import { TestBed } from '@angular/core/testing';

import { ChatRoomResolverResolver } from './chat-room-resolver.resolver';

describe('ChatRoomResolverResolver', () => {
  let resolver: ChatRoomResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ChatRoomResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
