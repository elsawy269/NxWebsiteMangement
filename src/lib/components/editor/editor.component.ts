import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import * as fromSharedFuse from '@SellTime/shared/fuse';
import * as fromCmsStore from '../../+state';
import * as fromRootState from '@AppState/index';

import { templates } from '../content-create/templates';
import { SaveContentModalComponent } from './save-content-modal/save-content-modal.component';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'selltime-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  content: ContentModel;
  dialogRef: MatDialogRef<SaveContentModalComponent>;
  assets$: Observable<string[]>;
  editMode: boolean;
  templateId: number;
  pageId: number;
  contentTypeId: number;
  constructor(
    private _fuseConfigService: fromSharedFuse.FuseConfigService,
    private cmsStore: Store<fromCmsStore.CmsState>,
    private rootStore: Store<fromRootState.AppState>,
    public dialog: MatDialog
  ) {
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  onAssetAdded($event): void {
    // this.attachment = $event;
  }

  onSaveContent(): void {
    this.dialogRef = this.dialog.open(SaveContentModalComponent, {
      width: '600px',
      data: {
        action: this.editMode ? 'edit' : 'add',
        content: this.editMode ? this.content : null,
        contentTypeId: this.contentTypeId,
        pageId: this.pageId
      }
    });

    this.dialogRef.afterClosed().subscribe((contentForm: FormGroup) => {
      if (!contentForm) {
        return;
      }

      if (contentForm.valid) {
        if (this.editMode) {
          this.cmsStore.dispatch(
            new fromCmsStore.UpdateContent(contentForm.getRawValue())
          );
        } else {
          this.cmsStore.dispatch(
            new fromCmsStore.CreateContent(contentForm.getRawValue())
          );
        }
      }
    });
  }

  ngOnInit() {
    this.rootStore.select(fromRootState.getRouterState).subscribe(router => {
      this.templateId = router.state.params.templateId;
      this.pageId = router.state.params.pageId;
      this.contentTypeId = router.state.params.contentTypeId;
    });

    this.cmsStore.select(fromCmsStore.getSelectedContent).subscribe(content => {
      debugger;
      if (content.body) {
        this.editMode = true;
        this.content = content;
      } else {
        this.content = templates[this.templateId];
      }
    });

    this.assets$ = this.cmsStore.select(fromCmsStore.getGalleries);
  }
}
