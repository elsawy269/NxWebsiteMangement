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
import { ContentModel } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class CmsEditorGuard implements CanActivate {
  constructor(private store: Store<fromStore.CmsState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    ) && +route.params.templateId > 0 ;
  }


  checkStore(): Observable<ContentModel> {
    return this.store.select(fromStore.getSelectedContent).pipe(
      filter(content => !!content ),
      take(1)
    )

  }

}
