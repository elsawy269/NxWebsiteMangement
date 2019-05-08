import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CmsPageEffects } from './cms-page.effects';

describe('CmsPageEffects', () => {
  let actions$: Observable<any>;
  let effects: CmsPageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsPageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CmsPageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
