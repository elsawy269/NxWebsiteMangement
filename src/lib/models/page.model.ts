import { ContentModel } from "./content.model";

export interface PageModel {
  id?: number;
  websiteId?: number;
  name?: string;
  title?: string;
  css?: string;
  subTitle?: string;
  meta?: string;
  metaKeywords?: string;
  metaDescription?: string;
  headHTML?: string;
  scripts?: string;
  menuRoute?: string;
  menuCss?: string;
  showOnMenu?: boolean;
  menuOrderNum?: number;
  templateId?: number;
  sortOrderId?: number;
  pageViewId?: number;
  trustLevelId?: number;
  wrapperId?: number;
  contents?:ContentModel[];
  contentCount?:number;
}
