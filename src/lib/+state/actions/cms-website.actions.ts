import { Action } from '@ngrx/store';
import { WebsiteModel } from '../../models/website.model';
import { Paging } from '../../models/paging.model';
import { HttpResponse } from '@angular/common/http';

export enum CmsWebsiteActionTypes {
  LOAD_WEBSITE = '[CMS] websites load',
  LOAD_WEBSITE_SUCCESS = '[CMS] websites load success',
  LOAD_WEBSITE_FAIL = '[CMS] websites load fail',

  CREATE_WEBSITE = '[CMS] create website',
  CREATE_WEBSITE_SUCCESS = '[CMS] create website success',
  CREATE_WEBSITE_FAIL = '[CMS] create website fail',

  UPDATE_WEBSITE = '[CMS] update website',
  UPDATE_WEBSITE_SUCCESS = '[CMS] update website success',
  UPDATE_WEBSITE_FAIL = '[CMS] update website fail',

  REMOVE_WEBSITE = '[CMS] remove website',
  REMOVE_WEBSITE_SUCCESS = '[CMS] remove website success',
  REMOVE_WEBSITE_FAIL = '[CMS] remove website fail'
}

export class LoadWebsite implements Action {
  readonly type = CmsWebsiteActionTypes.LOAD_WEBSITE;
  constructor(public paging: Paging) {}
}

export class LoadWebsiteSuccess implements Action {
  readonly type = CmsWebsiteActionTypes.LOAD_WEBSITE_SUCCESS;
  constructor(public payload: {websites:WebsiteModel[],retPaging:Paging}) {}
}

export class LoadWebsiteFail implements Action {
  readonly type = CmsWebsiteActionTypes.LOAD_WEBSITE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Create website action classes
 */
export class CreateWebsite implements Action {
  readonly type = CmsWebsiteActionTypes.CREATE_WEBSITE;
  constructor(public payload: WebsiteModel) {}
}

export class CreateWebsiteSuccess implements Action {
  readonly type = CmsWebsiteActionTypes.CREATE_WEBSITE_SUCCESS;
  constructor(public payload: WebsiteModel) {}
}

export class CreateWebsiteFail implements Action {
  readonly type = CmsWebsiteActionTypes.CREATE_WEBSITE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Update website action classes
 */
export class UpdateWebsite implements Action {
  readonly type = CmsWebsiteActionTypes.UPDATE_WEBSITE;
  constructor(public payload: WebsiteModel) {}
}

export class UpdateWebsiteSuccess implements Action {
  readonly type = CmsWebsiteActionTypes.UPDATE_WEBSITE_SUCCESS;
  constructor(public payload: WebsiteModel) {}
}

export class UpdateWebsiteFail implements Action {
  readonly type = CmsWebsiteActionTypes.UPDATE_WEBSITE_FAIL;
  constructor(public payload: any) {}
}

/**
 * @description Remove website action classes
 */
export class RemoveWebsite implements Action {
  readonly type = CmsWebsiteActionTypes.REMOVE_WEBSITE;
  constructor(public payload: WebsiteModel) {}
}

export class RemoveWebsiteSuccess implements Action {
  readonly type = CmsWebsiteActionTypes.REMOVE_WEBSITE_SUCCESS;
  constructor(public payload: WebsiteModel) {}
}

export class RemoveWebsiteFail implements Action {
  readonly type = CmsWebsiteActionTypes.REMOVE_WEBSITE_FAIL;
  constructor(public payload: any) {}
}

export type CmsWebsiteActions =
  | LoadWebsite
  | LoadWebsiteSuccess
  | LoadWebsiteFail
  | CreateWebsite
  | CreateWebsiteSuccess
  | CreateWebsiteFail
  | UpdateWebsite
  | UpdateWebsiteSuccess
  | UpdateWebsiteFail
  | RemoveWebsite
  | RemoveWebsiteSuccess
  | RemoveWebsiteFail;
