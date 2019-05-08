import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../+state';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';

import { Paging } from '../models/paging.model';

@Injectable({
  providedIn: 'root'
})
export class WebsiteViewGuard implements CanActivate {
  paging:Paging;
  constructor(private store: Store<fromStore.CmsState>) {
    this.paging = {
      pageNumber: 1,
      pageSize: 10
    };
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        // debugger;
        const id = +route.params.websiteId;
        return this.hasWebsite(id);
      })
    );
  }

  hasWebsite(id: number): Observable<boolean> {
    return this.store.select(fromStore.getWebsiteEntitiesState).pipe(
      map(entities => {
        // debugger;
        return !!entities[id];
      }),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getWebsitesLoaded).pipe(
      tap(loaded => {
        // debugger;
        if (!loaded) {
          this.store.dispatch(
            new fromStore.LoadWebsite(this.paging)
          );
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
