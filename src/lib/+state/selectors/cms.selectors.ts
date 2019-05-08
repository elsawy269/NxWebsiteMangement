import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CmsState } from '../reducers';

export const getCmsState = createFeatureSelector<CmsState>('cms');

export const getCmsGalleryState = createSelector(
  getCmsState,
  (state: CmsState) => {
    return state.galleries;
  }
);

export const getCmsContentTypeState = createSelector(
  getCmsState,
  (state: CmsState) => {
    return state.contentTypes;
  }
);

export const getCmsWebsiteState = createSelector(
  getCmsState,
  (state: CmsState) => {
    return state.websites;
  }
);
