import { Action } from '@ngrx/store';
import { GalleryModel } from '../../models/gallery.model';

export enum CmsGalleryActionTypes {
  LOAD_GALLERY = '[CMS] Gallery Load',
  LOAD_GALLERY_SUCCESS = '[CMS] Gallery Load Success',
  LOAD_GALLERY_FAIL = '[CMS] Gallery load fail'
}

export class LoadGallery implements Action {
  readonly type = CmsGalleryActionTypes.LOAD_GALLERY;
}

export class LoadGallerySuccess implements Action {
  readonly type = CmsGalleryActionTypes.LOAD_GALLERY_SUCCESS;
  constructor(public payload: GalleryModel[]) {}
}

export class LoadGalleryFail implements Action {
  readonly type = CmsGalleryActionTypes.LOAD_GALLERY_FAIL;
  constructor(public payload: any) {}
}

export type CmsGalleryActions =
  | LoadGallery
  | LoadGallerySuccess
  | LoadGalleryFail;
