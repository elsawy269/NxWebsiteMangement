import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { CmsService } from '../../cms.service';

import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromRoot from '@AppState/index';
import * as fromCmsActions from '../actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class CmsPageEffects {

  constructor(    private actions$: Actions,
    private cmsService: CmsService,
    private lookUpService: fromSharedFuse.LookUpService,
    private notifyService: fromSharedFuse.NotifyService) {}


      /**
     * @description  Page Effects
     */
    @Effect()
    createPage$: Observable<Action> = this.actions$
      .ofType(fromCmsActions.CmsPageActionTypes.CREATE_PAGE)
      .pipe(
        map((action: fromCmsActions.CreatePage) => action.payload),
        switchMap(Page => {
          return this.cmsService.addPage(Page).pipe(
            map(response => {
              this.notifyService.showSuccess(
                'Create Page',
                'Page Created Successfully'
              );
              response.websiteId = Page.websiteId;
              return new fromCmsActions.CreatePageSuccess(response)}),
            catchError(error => of(new fromCmsActions.CreatePageFail(error)))
          );
        })
      );


      @Effect()
      updatePage$: Observable<Action> = this.actions$
        .ofType(fromCmsActions.CmsPageActionTypes.UPDATE_PAGE)
        .pipe(
          map((action: fromCmsActions.UpdatePage) => action.payload),
          switchMap(Page => {
            return this.cmsService.editPage(Page).pipe(
              map(response =>{
                debugger;
                this.notifyService.showSuccess(
                  'Update Page',
                  'Page Updated Successfully'
                );
                return new fromCmsActions.UpdatePageSuccess(response)}),
              catchError(error => of(new fromCmsActions.UpdatePageFail(error)))
            );
          })
        );

}
