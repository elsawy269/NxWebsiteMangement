import { createSelector } from '@ngrx/store';
import * as fromCmsSelectors from './cms.selectors';
import * as fromCmsContentReducer from '../reducers/cms-content.reducers';

import * as fromRootState from '@AppState/index';
import { WebsiteModel } from '../../models/website.model';

export const getContentTypes = createSelector(
  fromCmsSelectors.getCmsContentTypeState,
  (state: fromCmsContentReducer.CmsContentTypeState) => {
    return state.contentTypes;
  }
);

export const getContentTypesLoaded = createSelector(
  fromCmsSelectors.getCmsContentTypeState,
  (state: fromCmsContentReducer.CmsContentTypeState) => {
    return state.ctLoaded;
  }
);
