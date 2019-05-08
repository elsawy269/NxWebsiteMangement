import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromRootState from '@AppState/index';
import * as fromCmsState from '../../+state';

import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { Paging } from '../../models/paging.model';
import { WebsiteModel } from '../../models/website.model';
import { MatDialog } from '@angular/material';
import { WebsiteCreateModalComponent } from './website-create-modal/website-create-modal.component';
import { FormGroup } from '@angular/forms';
import { PageCreateModalComponent } from './page-create-modal/page-create-modal.component';

@Component({
  selector: 'selltime-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.scss'],
  animations: fromSharedFuse.fuseAnimations
})
export class WebsiteListComponent implements OnInit, OnDestroy {
  @ViewChild('filter') filter: ElementRef;
  dialogRef: any;

  contents$: Observable<WebsiteModel[]>;
  loading$: Observable<boolean>;
  paging: Paging;
  loadMoreShow = true;
  onPagingChange: Subscription;
  onLengthChange: Subscription;
  constructor(
    private rootStore: Store<fromRootState.AppState>,
    private cmsStore: Store<fromCmsState.CmsState>,
    public dialog: MatDialog
  ) {}



  selectWebsite($event: number): void {
    this.rootStore.dispatch(
      new fromRootState.Go({
        path: ['cms/website-view', $event]
      })
    );
  }

  loadMore($event: number): void {
    // debugger;
    this.loadMoreShow = $event < this.paging.totalItems;
    if ($event < this.paging.totalItems) {
      this.paging.pageNumber = this.paging.pageNumber + 1;
      this.cmsStore.dispatch(new fromCmsState.LoadWebsite(this.paging));
    }
    // {"length":12,"pageSize":10,"pageIndex":0}
  }

  newWebsite(website?: WebsiteModel): void {
    if (website != null) {
      this.openCloseWebsiteDialoge(website);
    } else {
      this.openCloseWebsiteDialoge(null);
    }
  }

  openCloseWebsiteDialoge(website?: WebsiteModel) {
    this.dialogRef = this.dialog.open(WebsiteCreateModalComponent, {
      width: '800px',
      data: {
        action: website == null ? 'new' : 'edit',
        website: website
      }
    });

    this.dialogRef.afterClosed().subscribe((websiteForm: FormGroup) => {
      // debugger;
      if (!websiteForm) {
        return;
      }
      if (websiteForm.valid) {
        if (website == null) {
          this.cmsStore.dispatch(
            new fromCmsState.CreateWebsite(websiteForm.getRawValue())
          );
        } else {
          this.cmsStore.dispatch(
            new fromCmsState.UpdateWebsite(websiteForm.getRawValue())
          );
        }
      }
    });
  }

  addPage(website:WebsiteModel):void {
    this.dialogRef = this.dialog.open(PageCreateModalComponent,{
      width: '600px',
      data: {
        action: 'new',
        websiteId: website.id
      }
    });

    this.dialogRef.afterClosed().subscribe((pageForm: FormGroup) => {
      if (!pageForm) {
        return;
      }

      if (pageForm.valid) {
          this.cmsStore.dispatch(
            new fromCmsState.CreatePage(pageForm.getRawValue())
          );
      }
    });
  }

  ngOnInit() {


    this.contents$ = this.cmsStore.select(fromCmsState.getWebsites);

    this.loading$ = this.cmsStore.select(fromCmsState.getWebsitesLoading);

    this.onPagingChange = this.cmsStore
      .select(fromCmsState.getWebsitePaging)
      .subscribe(paging => {
        this.paging = Object.assign({}, paging);
      });
  }

  ngOnDestroy(): void {
    this.onPagingChange.unsubscribe();
  }
}
