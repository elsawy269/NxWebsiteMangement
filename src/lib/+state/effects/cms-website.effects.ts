import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { CmsService } from '../../cms.service';

import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromRoot from '@AppState/index';
import * as fromCmsActions from '../actions';

@Injectable()
export class CmsWebsiteEffects {
  constructor(
    private actions$: Actions,
    private cmsService: CmsService,
    private lookUpService: fromSharedFuse.LookUpService,
    private notifyService: fromSharedFuse.NotifyService
  ) {}


  @Effect()
  loadWebsites$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsWebsiteActionTypes.LOAD_WEBSITE)
    .pipe(
      switchMap((action: fromCmsActions.LoadWebsite) => {
        return this.cmsService
          .getWebsites(action.paging)
          .pipe(
            map(response => {
              // debugger;
              return new fromCmsActions.LoadWebsiteSuccess(response);
            }),
            catchError(error => of(new fromCmsActions.LoadWebsiteFail(error)))
          );
      })
    );

        /**
     * @description  Website Effects
     */
    @Effect()
    createWebsite$: Observable<Action> = this.actions$
      .ofType(fromCmsActions.CmsWebsiteActionTypes.CREATE_WEBSITE)
      .pipe(
        map((action: fromCmsActions.CreateWebsite) => action.payload),
        switchMap(website => {
          return this.cmsService.createWebsite(website).pipe(
            map(response => new fromCmsActions.CreateWebsiteSuccess(response)),
            catchError(error => of(new fromCmsActions.CreateWebsiteFail(error)))
          );
        })
      );



      @Effect()
      updateWebsite$: Observable<Action> = this.actions$
        .ofType(fromCmsActions.CmsWebsiteActionTypes.UPDATE_WEBSITE)
        .pipe(
          map((action: fromCmsActions.UpdateWebsite) => action.payload),
          switchMap(website => {
            return this.cmsService.updateWebsite(website).pipe(
              map(response =>  new fromCmsActions.UpdateWebsiteSuccess(response)),
              catchError(error => of(new fromCmsActions.UpdateWebsiteFail(error)))
            );
          })
        );


}
