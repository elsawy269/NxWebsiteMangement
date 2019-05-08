import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryModel } from './models/gallery.model';
import { catchError, map } from 'rxjs/operators';
import { ContentModel } from './models/content.model';
import { Paging } from './models/paging.model';
import { WebsiteModel } from './models/website.model';
import { PageModel } from './models/page.model';
@Injectable({
  providedIn: 'root'
})
export class CmsService {
  baseUrl = environment.devApi;
  constructor(private http: HttpClient) {}

  getGalleries(): Observable<GalleryModel[]> {
    return this.http
      .get<GalleryModel[]>(
        `${this.baseUrl}/Attachment?PageNumber=1&PageSize=100`
      )
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  /**
   * @description Managing Websites ( Web / blogs)
   */
  getWebsites(paging: Paging): Observable<any> {
    return this.http
      .get<WebsiteModel[]>(
        `${this.baseUrl}/website/AllData?PageNumber=${
          paging.pageNumber
        }&PageSize=${paging.pageSize}`,
        {
          withCredentials: true,
          observe: 'response'
        }
      )
      .pipe(
        map(response => {
          // debugger;
          const websites = response.body as WebsiteModel[];
          const pagingHeader = JSON.parse(response.headers.get('X-Pagination'));
          const retPaging: Paging = {
            totalItems: pagingHeader.totalCount,
            pageSize: pagingHeader.pageSize,
            pageNumber: pagingHeader.currentPage
            // totalItems: 50 ,
            // pageSize: 10,
            // pageNumber: 1
          };
          return { websites, retPaging };
        }),
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  /**
   * @description Website services
   */
  createWebsite(website: WebsiteModel): Observable<WebsiteModel> {
    return this.http
      .post(`${this.baseUrl}/Website`, website)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateWebsite(website: WebsiteModel): Observable<WebsiteModel> {
    return this.http
      .put(`${this.baseUrl}/Website/${website.id}`, website)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  /**
   * @description Page Services
   */

  addPage(page: PageModel): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/Page`, page)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  editPage(page: PageModel): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/Page/${page.id}`, page)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getPage(pageId: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/Page/${pageId}/false`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  deletePage(pageId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/Page/${pageId}/true`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  /**
   * @description Content Services
   */
  createContent(content: ContentModel): Observable<ContentModel> {
    return this.http
      .post(`${this.baseUrl}/Content`, content)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  editContent(content: ContentModel, id: number): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/Content/${id}`, content)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  getContentById(contentId: number): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/Content/${contentId}/true`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  deleteContent(contentId: number): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}/Content/${contentId}/true`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
