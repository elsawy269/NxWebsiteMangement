import * as fromCmsActions from '../actions';
import * as fromSharedFuse from '@SellTime/shared/fuse';

export interface CmsContentTypeState {
  contentTypes: fromSharedFuse.LookUpModel[];
  ctLoaded: boolean;
  ctLoading: boolean;
  
}

export const CmsContentInitialState: CmsContentTypeState = {
  contentTypes: [],
  ctLoaded: false,
  ctLoading: false
};

export function cmsContentTypeReducer(
  state = CmsContentInitialState,
  action: fromCmsActions.CmsContentActions
): CmsContentTypeState {
  switch (action.type) {
    case fromCmsActions.CmsContentActionTypes.LOAD_CONTENT_TYPES: {
      return {
        ...state,
        ctLoading: true
      };
    }

    case fromCmsActions.CmsContentActionTypes.LOAD_CONTENT_TYPES_SUCCESS: {
      //  debugger;
      const contentTypes = action.payload;

      return {
        ...state,
        ctLoaded: true,
        ctLoading: false,
        contentTypes
      };
    }

    case fromCmsActions.CmsContentActionTypes.LOAD_CONTENT_TYPES_FAIL: {
      return {
        ...state,
        ctLoaded: false,
        ctLoading: false
      };
    }
  }

  return state;
}
