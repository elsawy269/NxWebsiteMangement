import { Action } from '@ngrx/store';
import { ContentModel } from '../../models/content.model';
import { Paging } from '../../models/paging.model';
import { HttpResponse } from '@angular/common/http';
import * as fromSharedFuse from '@SellTime/shared/fuse';

export enum CmsContentActionTypes {
  LOAD_CONTENT_TYPES = '[CMS] content types load',
  LOAD_CONTENT_TYPES_SUCCESS = '[CMS] content types load success',
  LOAD_CONTENT_TYPES_FAIL = '[CMS] content types load fail',

  CREATE_CONTENT = '[CMS] create content',
  CREATE_CONTENT_SUCCESS = '[CMS] create content success',
  CREATE_CONTENT_FAIL = '[CMS] create content fail',

  UPDATE_CONTENT = '[CMS] update content',
  UPDATE_CONTENT_SUCCESS = '[CMS] update content success',
  UPDATE_CONTENT_FAIL = '[CMS] update content fail',

  DELETE_CONTENT = '[CMS] delete content',
  DELETE_CONTENT_SUCCESS = '[CMS] delete content success',
  DELETE_CONTENT_FAIL = '[CMS] delete content fail',

  SELECT_CONTENT = '[CMS] select content',
  SELECT_CONTENT_SUCCESS = '[CMS] select content success',
  SELECT_CONTENT_FAIL = '[CMS] select content fail'
}

/**
 * @description Load content-types action classes
 */
export class LoadContentTypes implements Action {
  readonly type = CmsContentActionTypes.LOAD_CONTENT_TYPES;
  constructor(public payload: string) {}
}

export class LoadContentTypesSuccess implements Action {
  readonly type = CmsContentActionTypes.LOAD_CONTENT_TYPES_SUCCESS;
  constructor(public payload: fromSharedFuse.LookUpModel[]) {}
}

export class LoadContentTypesFail implements Action {
  readonly type = CmsContentActionTypes.LOAD_CONTENT_TYPES_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Create content action classes
 */
export class CreateContent implements Action {
  readonly type = CmsContentActionTypes.CREATE_CONTENT;
  constructor(public payload: ContentModel) {}
}

export class CreateContentSuccess implements Action {
  readonly type = CmsContentActionTypes.CREATE_CONTENT_SUCCESS;
  constructor(public payload: ContentModel) {}
}

export class CreateContentFail implements Action {
  readonly type = CmsContentActionTypes.CREATE_CONTENT_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Update content action classes
 */
export class UpdateContent implements Action {
  readonly type = CmsContentActionTypes.UPDATE_CONTENT;
  constructor(public payload: ContentModel) {}
}

export class UpdateContentSuccess implements Action {
  readonly type = CmsContentActionTypes.UPDATE_CONTENT_SUCCESS;
  constructor(public payload: ContentModel) {}
}

export class UpdateContentFail implements Action {
  readonly type = CmsContentActionTypes.UPDATE_CONTENT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteContent implements Action {
  readonly type = CmsContentActionTypes.DELETE_CONTENT;
  constructor(public payload: ContentModel) {}
}

export class DeleteContentSuccess implements Action {
  readonly type = CmsContentActionTypes.DELETE_CONTENT_SUCCESS;
  constructor(public payload: ContentModel) {}
}

export class DeleteContentFail implements Action {
  readonly type = CmsContentActionTypes.DELETE_CONTENT_FAIL;
  constructor(public payload: any) {}
}

export class SelectContent implements Action {
  readonly type = CmsContentActionTypes.SELECT_CONTENT;
  constructor(public payload: number) {}
}

export class SelectContentSuccess implements Action {
  readonly type = CmsContentActionTypes.SELECT_CONTENT_SUCCESS;
  constructor(public payload: ContentModel) {}
}

export class SelectContentFail implements Action {
  readonly type = CmsContentActionTypes.SELECT_CONTENT_FAIL;
  constructor(public payload: any) {}
}

export type CmsContentActions =
  | CreateContent
  | CreateContentSuccess
  | CreateContentFail
  | UpdateContent
  | UpdateContentSuccess
  | UpdateContentFail
  | LoadContentTypes
  | LoadContentTypesSuccess
  | LoadContentTypesFail
  | DeleteContent
  | DeleteContentSuccess
  | DeleteContentFail
  | SelectContent
  | SelectContentSuccess
  | SelectContentFail;
