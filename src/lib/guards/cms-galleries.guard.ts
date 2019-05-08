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



@Injectable({
  providedIn: 'root'
})
export class CmsGalleriesGuard implements CanActivate {
  constructor(private store: Store<fromStore.CmsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStoreGalleries().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStoreGalleries(): Observable<boolean> {
    return this.store.select(fromStore.getGalleriesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadGallery());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
