import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CmsWebsiteEffects } from './cms-website.effects';

describe('CmsWebsiteEffects', () => {
  let actions$: Observable<any>;
  let effects: CmsWebsiteEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CmsWebsiteEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CmsWebsiteEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
