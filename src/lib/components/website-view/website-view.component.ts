import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCmsState from '../../+state';
import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromRootState from '@AppState/index';

import { WebsiteModel } from '../../models/website.model';
import { fuseAnimations } from '@SellTime/shared/fuse';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PageCreateModalComponent } from '../website-list/page-create-modal/page-create-modal.component';
import { FormGroup } from '@angular/forms';
import { ContentModel } from '../../models/content.model';
import { PageModel } from '../../models/page.model';

@Component({
  selector: 'selltime-website-view',
  templateUrl: './website-view.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./website-view.component.scss'],
  animations: fuseAnimations
})
export class WebsiteViewComponent implements OnInit, AfterViewInit, OnDestroy {
  website: WebsiteModel;
  onSelectWebsite: Subscription;
  animationDirection: 'left' | 'right' | 'none';
  courseStepContent: any;
  currentStep: number;
  dialogRef: any;
  @ViewChildren(fromSharedFuse.FusePerfectScrollbarDirective)
  fuseScrollbarDirectives: QueryList<
    fromSharedFuse.FusePerfectScrollbarDirective
  >;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private cmsStore: Store<fromCmsState.CmsState>,
    public dialog: MatDialog,
    private rootStore: Store<fromRootState.AppState>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseSidebarService: fromSharedFuse.FuseSidebarService,
    private notifyService: fromSharedFuse.NotifyService
  ) {
    // Set the defaults
    this.animationDirection = 'none';
    this.currentStep = 0;

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.onSelectWebsite = this.cmsStore
      .select(fromCmsState.getSelectedWebsite)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(website => {
        // debugger;
        if (website) {
          this.website = website;
        }
      });
  }
  /**
   * After view init
   */
  ngAfterViewInit(): void {
    this.courseStepContent = this.fuseScrollbarDirectives.find(
      fuseScrollbarDirective => {
        return (
          fuseScrollbarDirective.elementRef.nativeElement.id ===
          'course-step-content'
        );
      }
    );
  }

  addContent(pageId: number): void {
    // debugger;
    this.rootStore.dispatch(
      new fromRootState.Go({
        path: ['cms/content-create', pageId]
      })
    );
  }

  editContent(content: ContentModel, pageId: number): void {
    // debugger;
    this.cmsStore.dispatch(new fromCmsState.SelectContent(content.id));
  }

  addPage(website: WebsiteModel): void {
    this.dialogRef = this.dialog.open(PageCreateModalComponent, {
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

  deleteContent(content: ContentModel): void {
    this.notifyService.showPrompt(
      'Are you sure?',
      "You won't be able to revert this!",
      'Yes, delete it!',
      result => {
        if (result.value) {
          this.cmsStore.dispatch(new fromCmsState.DeleteContent(content));
        }
      }
    );
  }

  editPage(page: PageModel, websiteId: number): void {
    this.dialogRef = this.dialog.open(PageCreateModalComponent, {
      width: '600px',
      data: {
        action: 'edit',
        page: page,
        websiteId
      }
    });

    this.dialogRef.afterClosed().subscribe((pageForm: FormGroup) => {
      if (!pageForm) {
        return;
      }

      if (pageForm.valid) {
        this.cmsStore.dispatch(
          new fromCmsState.UpdatePage(pageForm.getRawValue())
        );
      }
    });
  }

  /**`
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.onSelectWebsite.unsubscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Go to step
   *
   * @param step
   */
  gotoStep(step): void {
    // Decide the animation direction
    this.animationDirection = this.currentStep < step ? 'left' : 'right';

    // Run change detection so the change
    // in the animation direction registered
    this._changeDetectorRef.detectChanges();

    // Set the current step
    this.currentStep = step;
  }

  /**
   * Go to next step
   */
  gotoNextStep(): void {
    if (this.currentStep === this.website.pageCount - 1) {
      return;
    }

    // Set the animation direction
    this.animationDirection = 'left';

    // Run change detection so the change
    // in the animation direction registered
    this._changeDetectorRef.detectChanges();

    // Increase the current step
    this.currentStep++;
  }

  /**
   * Go to previous step
   */
  gotoPreviousStep(): void {
    if (this.currentStep === 0) {
      return;
    }

    // Set the animation direction
    this.animationDirection = 'right';

    // Run change detection so the change
    // in the animation direction registered
    this._changeDetectorRef.detectChanges();

    // Decrease the current step
    this.currentStep--;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}
