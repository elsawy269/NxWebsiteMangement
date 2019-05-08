import { PageModel } from './page.model';

export interface WebsiteModel {
  id?: number;
  name?: string;
  pages?:PageModel[];
  expiryDate?: string;
  publishDate?: string;
  domainKey?: string;
  themeId?: number;
  dbConnectionId?: number;
  isActive?: boolean;
  websiteUrls?:WebsiteUrlModel[];
  notifications?: NotificationsModel[];
  secretKey?:string;
  pageCount?:number;
}

export interface WebsiteUrlModel {
  id?: number;
  websiteId?: number;
  url?: string;
  secretKey?:string;
}
export interface NotificationsModel {

  displayName?: string,
  email?: string,
  isSendSales?: boolean,
  isSendSupport?: boolean,
  websiteId?: number
}
