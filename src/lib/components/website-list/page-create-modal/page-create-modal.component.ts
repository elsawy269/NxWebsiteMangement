import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageModel } from '../../../models/page.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'selltime-page-create-modal',
  templateUrl: './page-create-modal.component.html',
  styleUrls: ['./page-create-modal.component.scss']
})
export class PageCreateModalComponent implements OnInit {
  dialogTitle: string;
  pageForm: FormGroup;
  action: string;
  page: PageModel;

  constructor(
    public dialogRef: MatDialogRef<PageCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) {}

  createPageForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.page.id],
      name: [this.page.name],
      title: [this.page.title],
      meta: [this.page.meta],
      metaDescription: [this.page.metaDescription],
      websiteId: this.data.websiteId
    });
  }

  ngOnInit() {
    this.action = this.data.action;
    if (this.action === 'edit') {
      this.page = this.data.page;
      this.dialogTitle = `Edit Page`;
    } else {
      this.dialogTitle = 'New Page';
      this.page = {
        name: '',
        title: '',
        meta: '',
        metaDescription: ''
      };
    }

    this.pageForm = this.createPageForm();
  }
}
