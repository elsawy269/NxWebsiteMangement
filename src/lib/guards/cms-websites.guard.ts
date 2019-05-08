import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../+state';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import * as fromSharedFuse from '@SellTime/shared/fuse';
import { Paging } from '../models/paging.model';

@Injectable({
  providedIn: 'root'
})
export class CmsWebsitesGuard implements CanActivate {
  paging: Paging;
  constructor(private store: Store<fromStore.CmsState>) {
    this.paging = {
      pageNumber: 1,
      pageSize: 10
    };
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getWebsitesLoaded).pipe(
      tap(loaded => {
        // debugger;
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadWebsite(this.paging));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
