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




@Injectable({
  providedIn: 'root'
})
export class CmsContentTypeGuard implements CanActivate {
  constructor(private store: Store<fromStore.CmsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStoreContentTypes().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStoreContentTypes(): Observable<boolean> {
    return this.store.select(fromStore.getContentTypesLoaded).pipe(
      tap(ctLoaded => {
        // debugger;
        if (!ctLoaded) {
          this.store.dispatch(
            new fromStore.LoadContentTypes(fromSharedFuse.LookUpCodes.contentTypeCode)
          );
        }
      }),
      filter(ctLoaded => ctLoaded),
      take(1)
    );
  }
}
