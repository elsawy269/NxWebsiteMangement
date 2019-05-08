import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as fromCmsActions from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CmsService } from '../../cms.service';

@Injectable()
export class CmsGalleryEffects {
  constructor(private actions$: Actions, private cmsService: CmsService) {}

  @Effect()
  loadGalleries$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsGalleryActionTypes.LOAD_GALLERY)
    .pipe(
      switchMap(() => {
        return this.cmsService.getGalleries().pipe(
          map(galleries => new fromCmsActions.LoadGallerySuccess(galleries)),
          catchError(error => of(new fromCmsActions.LoadGalleryFail(error)))
        );
      })
    );
}
