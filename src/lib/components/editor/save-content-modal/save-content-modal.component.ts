import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContentModel } from '../../../models/content.model';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepickerInputEvent
} from '@angular/material';

import * as fromSharedFuse from '@SellTime/shared/fuse';
@Component({
  selector: 'selltime-save-content-modal',
  templateUrl: './save-content-modal.component.html',
  styleUrls: ['./save-content-modal.component.scss']
})
export class SaveContentModalComponent implements OnInit {
  dialogTitle: string;
  contentForm: FormGroup;
  action: string;
  content: ContentModel;
  imgUrl: string;
  constructor(
    public dialogRef: MatDialogRef<SaveContentModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private slug: fromSharedFuse.SlugService
  ) {}

  createContentForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.content.id],
      name: [{ value: this.content.name, disabled: true }],
      title: [this.content.title, Validators.required],
      contentTypeId: [this.content.contentTypeId, Validators.required],
      slug: [{ value: this.content.slug, disabled: true }],
      body: [this.content.body],
      styleName: [this.content.styleName],
      datePublished: [this.content.datePublished],
      pageId: [this.content.pageId],
      author: [this.content.author],
      isCms: true,
      linkURL: [this.imgUrl],
      publishExpireDate: [this.content.publishExpireDate]
    });
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = this.content.body;
    debugger;
    const elems = Array.from(htmlObject.getElementsByClassName('publishDate'));
    elems.forEach(elem => {
      if (elem.id === 'publishDate') {
        debugger;
        elem.innerHTML = (<any>event.value).format('MMM  DD , YYYY');
      }
    });

    this.contentForm.get('body').setValue(htmlObject.innerHTML);
  }

  onAuthorChange($event): void {
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = this.content.body;
    const elems = Array.from(htmlObject.getElementsByClassName('author'));
    elems.forEach(elem => {
      if (elem.id === 'author') {
        debugger;
        elem.innerHTML = this.contentForm.get('author').value;
      }
    });

    this.contentForm.get('body').setValue(htmlObject.innerHTML);
  }

  onNameChange($event): void {
    // debugger;
    this.contentForm
      .get('slug')
      .setValue(this.slug.slugify(this.contentForm.get('title').value));

    this.contentForm.get('name').setValue(this.contentForm.get('title').value);

    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = this.content.body;
    const titleElem = htmlObject.getElementsByClassName('post-title')[0];
    if (titleElem) {
      htmlObject.getElementsByClassName(
        'post-title'
      )[0].innerHTML = this.contentForm.get('title').value;

      this.contentForm.get('body').setValue(htmlObject.innerHTML);
    }
  }

  clearEditorContent(): void {
    // debugger;
    this.content.body = this.content.isCms
      ? this.content.body
      : localStorage.getItem('gjs-html').toString();
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = this.content.body;
    const imgs = Array.from(htmlObject.getElementsByTagName('img'));
    this.imgUrl = imgs ? imgs[0].src : '';

    // getting Title
    if (!this.content.title) {
      this.content.title = htmlObject.getElementsByClassName('post-title')[0]
        ? htmlObject.getElementsByClassName('post-title')[0].innerHTML
        : '';
      this.content.slug = this.slug.slugify(this.content.title);
      this.content.name = this.content.title;
    }

    this.clearStorage();
  }

  clearStorage(): void {
    const arr = [];
    // tslint:disable-next-line:prefer-const
    for (let i in localStorage) {
      if (i.substring(0, 3) === 'gjs') {
        arr.push(i);
      }
    }
    // tslint:disable-next-line:prefer-const
    for (let j of arr) {
      localStorage.removeItem(arr[j]);
    }
  }

  ngOnInit() {
    this.action = this.data.action;
    if (this.action === 'add') {
      this.dialogTitle = 'New Content';
      this.content = {
        id: null,
        name: '',
        pageId: this.data.pageId,
        title: '',
        slug: '',
        body: localStorage.getItem('gjs-html').toString(),
        contentTypeId: this.data.contentTypeId,
        datePublished: '',
        author: '',
        isCms: true,
        linkURL: this.imgUrl,
        publishExpireDate: '',
        styleName: localStorage.getItem('gjs-css').toString()
      };
    } else {
      this.dialogTitle = 'Edit Content';
      this.content = Object.assign({}, this.data.content);
      this.content.styleName = this.content.styleName
        ? this.content.styleName
        : localStorage.getItem('gjs-css').toString();
      if (!this.content.isCms) {
        if (this.content.attachments.length)
          this.content.linkURL = this.content.attachments[0].url;
      }
    }

    this.clearEditorContent();
    this.contentForm = this.createContentForm();
  }
}
