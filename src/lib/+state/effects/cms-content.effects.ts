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
export class CmsContentEffects {
  constructor(
    private actions$: Actions,
    private cmsService: CmsService,
    private lookUpService: fromSharedFuse.LookUpService,
    private notifyService: fromSharedFuse.NotifyService
  ) {}

  @Effect()
  loadContentTypes$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.LOAD_CONTENT_TYPES)
    .pipe(
      switchMap((action: fromCmsActions.LoadContentTypes) => {
        return this.lookUpService.getLookUp(action.payload).pipe(
          map(response => {
            // debugger;
            return new fromCmsActions.LoadContentTypesSuccess(response);
          }),
          catchError(error =>
            of(new fromCmsActions.LoadContentTypesFail(error))
          )
        );
      })
    );

  /**
   * @description Content Effects
   */

  @Effect()
  createContent$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.CREATE_CONTENT)
    .pipe(
      map((action: fromCmsActions.CreateContent) => action.payload),
      switchMap(Content => {
        return this.cmsService.createContent(Content).pipe(
          map(content => new fromCmsActions.CreateContentSuccess(content)),
          catchError(error => of(new fromCmsActions.CreateContentFail(error)))
        );
      })
    );

  @Effect()
  createContentSuccess$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.CREATE_CONTENT_SUCCESS)
    .pipe(
      map((action: fromCmsActions.CreateContentSuccess) => action.payload),
      map(content => {
        this.notifyService.showSuccess(
          'Create Content',
          'Content Created Successfully'
        );
        return new fromRoot.Go({
          path: [`/cms/website-view/${content.websiteId}`]
        });
      })
    );

  @Effect()
  updateContent$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.UPDATE_CONTENT)
    .pipe(
      map((action: fromCmsActions.UpdateContent) => action.payload),
      switchMap(Content => {
        return this.cmsService.editContent(Content, Content.id).pipe(
          map(content => new fromCmsActions.UpdateContentSuccess(content)),
          catchError(error => of(new fromCmsActions.UpdateContentFail(error)))
        );
      })
    );

  @Effect()
  updateContentSuccess$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.UPDATE_CONTENT_SUCCESS)
    .pipe(
      map((action: fromCmsActions.UpdateContentSuccess) => action.payload),
      map(content => {
        this.notifyService.showSuccess(
          'Edit Content',
          'Content Updated Successfully'
        );
        return new fromRoot.Go({
          path: [`/cms/website-view/${content.websiteId}`]
        });
      })
    );

  @Effect()
  deleteContent$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.DELETE_CONTENT)
    .pipe(
      map((action: fromCmsActions.DeleteContent) => action.payload),
      switchMap(content => {
        return this.cmsService.deleteContent(content.id).pipe(
          map(res => new fromCmsActions.DeleteContentSuccess(content)),
          catchError(error => of(new fromCmsActions.DeleteContentFail(error)))
        );
      })
    );

  @Effect({ dispatch: false })
  deleteContentSuccess$: Observable<void> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.DELETE_CONTENT_SUCCESS)
    .pipe(
      map((action: fromCmsActions.DeleteContentSuccess) => action.payload),
      map(content => {
        this.notifyService.showSuccess(
          'Remove Content',
          'Content Removed Successfully'
        );
      })
    );

  @Effect()
  selectContent$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.SELECT_CONTENT)
    .pipe(
      map((action: fromCmsActions.SelectContent) => action.payload),
      switchMap(contentId => {
        return this.cmsService.getContentById(contentId).pipe(
          map(content => {
            content.id = contentId;
            return new fromCmsActions.SelectContentSuccess(content);
          }),
          catchError(error => of(new fromCmsActions.SelectContentFail(error)))
        );
      })
    );

  @Effect()
  selectContentSuccess$: Observable<Action> = this.actions$
    .ofType(fromCmsActions.CmsContentActionTypes.SELECT_CONTENT_SUCCESS)
    .pipe(
      map((action: fromCmsActions.SelectContentSuccess) => action.payload),
      map(content => {
        return new fromRoot.Go({
          path: [`/cms/editor/0/${content.pageId}/${content.contentTypeId}`]
        });
      })
    );
}
