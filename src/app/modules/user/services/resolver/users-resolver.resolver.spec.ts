import { TestBed } from '@angular/core/testing';

import { UsersResolverResolver } from './users-resolver.resolver';

describe('UsersResolverResolver', () => {
  let resolver: UsersResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UsersResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
