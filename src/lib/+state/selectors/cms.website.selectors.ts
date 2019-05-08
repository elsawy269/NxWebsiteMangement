import { createSelector } from '@ngrx/store';
import * as fromCmsSelectors from './cms.selectors';
import * as fromCmsWebsiteReducer from '../reducers/cms-website.reducer';

import * as fromRootState from '@AppState/index';
import { WebsiteModel } from '../../models/website.model';

export const getWebsiteEntitiesState = createSelector(
  fromCmsSelectors.getCmsWebsiteState,
  (state: fromCmsWebsiteReducer.CmsWebsiteState) => {
    return state.entities;
  }
);

export const getWebsites = createSelector(getWebsiteEntitiesState, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getSelectedWebsite = createSelector(
  getWebsiteEntitiesState,
  fromRootState.getRouterState,
  (entities, router): WebsiteModel => {
    return router.state && entities[router.state.params.websiteId];
  }
);

export const getWebsitesLoaded = createSelector(
  fromCmsSelectors.getCmsWebsiteState,
  (state: fromCmsWebsiteReducer.CmsWebsiteState) => {
    return state.loaded;
  }
);

export const getWebsitesLoading = createSelector(
  fromCmsSelectors.getCmsWebsiteState,
  (state: fromCmsWebsiteReducer.CmsWebsiteState) => {
    return state.loading;
  }
);

export const getWebsitePaging = createSelector(
  fromCmsSelectors.getCmsWebsiteState,
  (state: fromCmsWebsiteReducer.CmsWebsiteState) => {
    return state.paging;
  }
);

export const getSelectedContent = createSelector(
  fromCmsSelectors.getCmsWebsiteState,
  (state: fromCmsWebsiteReducer.CmsWebsiteState) => {
    return state.selectedContent;
  }
);
