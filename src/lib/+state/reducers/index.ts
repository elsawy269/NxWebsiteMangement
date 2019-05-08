import * as fromCmsGalleryReducer from './cms-gallery.reducers';
import * as fromCmsContentReducer from './cms-content.reducers';
import * as fromCmsWebsiteReducer from './cms-website.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface CmsState {
  galleries: fromCmsGalleryReducer.CmsGalleryState;
  contentTypes: fromCmsContentReducer.CmsContentTypeState;
  websites:fromCmsWebsiteReducer.CmsWebsiteState
}

export const cmsReducers: ActionReducerMap<CmsState> = {
  galleries: fromCmsGalleryReducer.cmsGalleryReducer,
  contentTypes: fromCmsContentReducer.cmsContentTypeReducer,
  websites:fromCmsWebsiteReducer.cmsWebsiteReducer
};
