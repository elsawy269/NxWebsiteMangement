import { createSelector } from '@ngrx/store';
import * as fromCmsSelectors from './cms.selectors';
import * as fromCmsGalleryReducers from '../reducers/cms-gallery.reducers';
import { environment } from '@env/environment';

export const getGalleryEntitiesState = createSelector(
  fromCmsSelectors.getCmsGalleryState,
  (state: fromCmsGalleryReducers.CmsGalleryState) => {
    return state.entities;
  }
);

export const getGalleries = createSelector(
  getGalleryEntitiesState,
  entities => {
    return Object.keys(entities).map(id => environment.ImageApiUrl +entities[id].url);
  }
);

export const getGalleriesLoaded = createSelector(
  fromCmsSelectors.getCmsGalleryState,
  (state: fromCmsGalleryReducers.CmsGalleryState) => {
    return state.loaded;
  }
);


export const getGalleriesLoading = createSelector(
  fromCmsSelectors.getCmsGalleryState,
  (state: fromCmsGalleryReducers.CmsGalleryState) => {
    return state.loading;
  }
);
