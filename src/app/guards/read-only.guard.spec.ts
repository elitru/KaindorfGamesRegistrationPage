import { TestBed } from '@angular/core/testing';

import { ReadOnlyGuard } from './read-only.guard';

describe('ReadOnlyGuard', () => {
  let guard: ReadOnlyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReadOnlyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
