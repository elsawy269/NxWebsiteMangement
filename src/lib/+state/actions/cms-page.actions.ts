import { Action } from '@ngrx/store';
import { PageModel } from '../../models/page.model';

export enum CmsPageActionTypes {
  CREATE_PAGE = '[CMS] create page',
  CREATE_PAGE_SUCCESS = '[CMS] create page success',
  CREATE_PAGE_FAIL = '[CMS] create page fail',

  UPDATE_PAGE = '[CMS] update page',
  UPDATE_PAGE_SUCCESS = '[CMS] update page success',
  UPDATE_PAGE_FAIL = '[CMS] update page fail',
  
  REMOVE_PAGE = '[CMS] remove page',
  REMOVE_PAGE_SUCCESS = '[CMS] remove page success',
  REMOVE_PAGE_FAIL = '[CMS] remove page fail'
}


/**
 * @description Create PAGE action classes
 */
export class CreatePage implements Action {
  readonly type = CmsPageActionTypes.CREATE_PAGE;
  constructor(public payload: PageModel) {}
}

export class CreatePageSuccess implements Action {
  readonly type = CmsPageActionTypes.CREATE_PAGE_SUCCESS;
  constructor(public payload: PageModel) {}
}

export class CreatePageFail implements Action {
  readonly type = CmsPageActionTypes.CREATE_PAGE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Update PAGE action classes
 */
export class UpdatePage implements Action {
  readonly type = CmsPageActionTypes.UPDATE_PAGE;
  constructor(public payload: PageModel) {}
}

export class UpdatePageSuccess implements Action {
  readonly type = CmsPageActionTypes.UPDATE_PAGE_SUCCESS;
  constructor(public payload: PageModel) {}
}

export class UpdatePageFail implements Action {
  readonly type = CmsPageActionTypes.UPDATE_PAGE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Remove PAGE action classes
 */
export class RemovePage implements Action {
  readonly type = CmsPageActionTypes.REMOVE_PAGE;
  constructor(public payload: PageModel) {}
}

export class RemovePageSuccess implements Action {
  readonly type = CmsPageActionTypes.REMOVE_PAGE_SUCCESS;
  constructor(public payload: PageModel) {}
}

export class RemovePageFail implements Action {
  readonly type = CmsPageActionTypes.REMOVE_PAGE_FAIL;
  constructor(public payload: any) {}
}



export type CmsPageActions =
  | CreatePage
  | CreatePageSuccess
  | CreatePageFail
  | UpdatePage
  | UpdatePageSuccess
  | UpdatePageFail
  | RemovePage
  | RemovePageSuccess
  | RemovePageFail;

