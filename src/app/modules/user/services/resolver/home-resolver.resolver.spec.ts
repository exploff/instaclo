import { TestBed } from '@angular/core/testing';

import { HomeResolverResolver } from './home-resolver.resolver';

describe('HomeResolverResolver', () => {
  let resolver: HomeResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomeResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
