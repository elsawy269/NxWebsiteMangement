import * as fromCmsActions from '../actions';
import { Paging } from '../../models/paging.model';
import * as fromSharedFuse from '@SellTime/shared/fuse';
import { WebsiteModel } from '../../models/website.model';
import { ContentModel } from '../../models/content.model';

export interface CmsWebsiteState {
  entities: { [id: number]: WebsiteModel };
  paging: Paging;
  loaded: boolean;
  loading: boolean;
  selectedContent: ContentModel;
}

export const initialState: CmsWebsiteState = {
  entities: {},
  paging: {},
  loaded: false,
  loading: false,
  selectedContent: {}
};

export function cmsWebsiteReducer(
  state = initialState,
  action:
    | fromCmsActions.CmsWebsiteActions
    | fromCmsActions.CmsPageActions
    | fromCmsActions.CmsContentActions
): CmsWebsiteState {
  switch (action.type) {
    case fromCmsActions.CmsWebsiteActionTypes.LOAD_WEBSITE: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCmsActions.CmsWebsiteActionTypes.LOAD_WEBSITE_SUCCESS: {
      const response = action.payload;
      const contents = response.websites;
      const paging = response.retPaging;
      const entities = contents.reduce(
        // tslint:disable-next-line:no-shadowed-variable
        (entities: { [id: number]: WebsiteModel }, Content: WebsiteModel) => {
          return {
            ...entities,
            [Content.id]: Content
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
        entities,
        paging
      };
    }

    case fromCmsActions.CmsWebsiteActionTypes.CREATE_WEBSITE_SUCCESS: {
      const website = action.payload;
      const entities = {
        ...state.entities,
        [website.id]: website
      };
      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsWebsiteActionTypes.UPDATE_WEBSITE_SUCCESS: {
      const website = action.payload;
      // debugger;
      const currentWebsite = Object.assign([], state.entities[website.id]);
      currentWebsite.name = website.name;
      currentWebsite.isActive = website.isActive;
      currentWebsite.domainKey = website.domainKey;
      currentWebsite.publishDate = website.publishDate;
      currentWebsite.expiryDate = website.expiryDate;
      currentWebsite.websiteUrls = website.websiteUrls;
      currentWebsite.notifications = website.notifications;
      // website.pages = Object.assign(currentWebsitePages);
      const entities = {
        ...state.entities,
        [website.id]: currentWebsite
      };
      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsWebsiteActionTypes.REMOVE_WEBSITE_SUCCESS: {
      const website = action.payload;
      const { [website.id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsWebsiteActionTypes.LOAD_WEBSITE_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case fromCmsActions.CmsPageActionTypes.CREATE_PAGE_SUCCESS: {
      const page = action.payload;
      const website = Object.assign({}, state.entities[page.websiteId]);
      website.pages = Object.assign([...website.pages, page]);
      website.pageCount = website.pageCount + 1;
      const entities = {
        ...state.entities,
        [website.id]: website
      };

      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsPageActionTypes.UPDATE_PAGE_SUCCESS: {
      const page = action.payload;
      const website = Object.assign({}, state.entities[page.websiteId]);
      // debugger;
      const pages = website.pages.filter(elem => elem.id !== page.id);

      website.pages = Object.assign([...pages, page]);

      const entities = {
        ...state.entities,
        [website.id]: website
      };

      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsPageActionTypes.REMOVE_PAGE_SUCCESS: {
      // debugger;
      const page = action.payload;
      const website = Object.assign({}, state.entities[page.websiteId]);

      const pages = website.pages.filter(value => value.id !== page.id);
      website.pages = Object.assign([...pages]);

      const entities = {
        ...state.entities,
        [website.id]: website
      };
      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsContentActionTypes.CREATE_CONTENT_SUCCESS: {
      const content = action.payload;
      const website = Object.assign({}, state.entities[+content.websiteId]);
      const page = Object.assign(
        {},
        website.pages.find(elem => elem.id === +content.pageId)
      );
      page.contents = Object.assign([...page.contents, content]);
      page.contentCount = page.contentCount + 1;

      const pages = website.pages.filter(elem => elem.id !== page.id);
      website.pages = Object.assign([...pages, page]);

      const entities = {
        ...state.entities,
        [website.id]: website
      };

      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsContentActionTypes.UPDATE_CONTENT_SUCCESS: {
      const content = action.payload;
      const website = Object.assign({}, state.entities[+content.websiteId]);
      const page = Object.assign(
        {},
        website.pages.find(elem => elem.id === +content.pageId)
      );
      const contents = page.contents.filter(elem => elem.id !== content.id);
      page.contents = Object.assign([...contents, content]);

      const pages = website.pages.filter(elem => elem.id !== page.id);
      website.pages = Object.assign([...pages, page]);

      const entities = {
        ...state.entities,
        [website.id]: website
      };

      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsContentActionTypes.DELETE_CONTENT_SUCCESS: {
      const content = action.payload;
      const website = Object.assign({}, state.entities[+content.websiteId]);
      const page = Object.assign(
        {},
        website.pages.find(elem => elem.id === +content.pageId)
      );
      const contents = page.contents.filter(elem => elem.id !== content.id);
      page.contents = Object.assign([...contents]);

      const pages = website.pages.filter(elem => elem.id !== page.id);
      website.pages = Object.assign([...pages, page]);

      const entities = {
        ...state.entities,
        [website.id]: website
      };

      return {
        ...state,
        entities
      };
    }

    case fromCmsActions.CmsContentActionTypes.SELECT_CONTENT_SUCCESS: {
      const selectedContent = action.payload;

      return {
        ...state,
        selectedContent
      };
    }

    /* end of switch */
  }

  return state;
}
