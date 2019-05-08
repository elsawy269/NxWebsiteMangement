import { GalleryModel } from '../../models/gallery.model';
import * as fromCmsActions from '../actions';

export interface CmsGalleryState {
  entities: { [id: number]: GalleryModel };
  loaded: boolean;
  loading: boolean;
}

export const CmsGalleryInitialState: CmsGalleryState = {
  entities: {},
  loaded: false,
  loading: false
};

export function cmsGalleryReducer(
  state = CmsGalleryInitialState,
  action: fromCmsActions.CmsGalleryActions
): CmsGalleryState {
  switch (action.type) {
    case fromCmsActions.CmsGalleryActionTypes.LOAD_GALLERY: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCmsActions.CmsGalleryActionTypes.LOAD_GALLERY_SUCCESS: {
      const galleries = action.payload;
      const entities = galleries.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: GalleryModel }, gallery: GalleryModel) => {
          return {
            ...entities,
            [gallery.id]: gallery
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromCmsActions.CmsGalleryActionTypes.LOAD_GALLERY_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }

  return state;
}
