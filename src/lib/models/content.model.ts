export interface ContentModel {
  id?: number;
  name?: string;
  title?: string;
  body?: string;
  slug?: string;
  metaTitle?: string;
  metaKeywords?: string;
  metaDescription?: string;
  ref1?: string;
  ref2?: string;
  styleName?: string;
  linkURL?: string;
  titleStyleName?: string;
  priceDisplay?: string;
  wrapperId?: number;
  statusId?: number;
  contentTypeId?: number;
  authorId?: number;
  author?: string;
  sectionId?: number;
  sortOrder?: number;
  attachments?: any[];
  galleryId?: number;
  addressId?: number;
  productId?: number;
  priceFrom?: number;
  priceTo?: number;
  templateId?: number;
  datePublished?: string;
  publishExpireDate?: string;
  pageId?: number;
  pageName?: string;
  websiteName?: string;
  websiteId?: number;
  contentType?: string;
  updateDate?: string;
  privacyType?: number;
  isCms?: boolean;
}
