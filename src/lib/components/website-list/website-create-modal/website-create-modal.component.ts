import { Component, OnInit, Inject } from '@angular/core';
import {
  WebsiteModel,
  NotificationsModel
} from '../../../models/website.model';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'selltime-website-create-modal',
  templateUrl: './website-create-modal.component.html',
  styleUrls: ['./website-create-modal.component.scss']
})
export class WebsiteCreateModalComponent implements OnInit {
  dialogTitle: string;
  websiteForm: FormGroup;
  action: string;
  website: WebsiteModel;

  constructor(
    public dialogRef: MatDialogRef<WebsiteCreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get websiteUrls(): FormArray {
    return <FormArray>this.websiteForm.get('websiteUrls');
  }

  get notifications(): FormArray {
    return <FormArray>this.websiteForm.get('notifications');
  }

  createWebsiteForm(): FormGroup {
    if (this.action === 'edit') {
      return this.formBuilder.group({
        id: [this.website.id],
        name: [this.website.name, Validators.required],
        expiryDate: [this.website.expiryDate],
        publishDate: [this.website.publishDate],
        domainKey: [this.website.domainKey],
        secretKey: [this.website.secretKey],
        websiteUrls: this.formBuilder.array([]),
        notifications: this.formBuilder.array([])
      });
    } else {
      return this.formBuilder.group({
        id: [this.website.id],
        name: [this.website.name, Validators.required],
        expiryDate: [this.website.expiryDate],
        publishDate: [this.website.publishDate],
        domainKey: [this.website.domainKey],
        secretKey: [this.website.secretKey],
        websiteUrls: this.formBuilder.array([this.buildWebsiteUrls()]),
        notifications: this.formBuilder.array([this.buildWebsiteNotifiers()])
      });
    }
  }

  buildWebsiteUrls(value?: string): FormGroup {
    return this.formBuilder.group({
      url: [value ? value : '', Validators.required]
    });
  }

  buildWebsiteNotifiers(notification?: NotificationsModel): FormGroup {
    notification = notification ? notification : {};
    return this.formBuilder.group({
      displayName: [notification.displayName ? notification.displayName : ''],
      email: [notification.email ? notification.email : '', Validators.email]
    });
  }

  addWebsiteUrl(value?: string): void {
    this.websiteUrls.push(this.buildWebsiteUrls(value));
  }

  removeWebsiteUrl(index): void {
    this.websiteUrls.removeAt(index);
  }

  addNotification(notification?: NotificationsModel): void {
    this.notifications.push(this.buildWebsiteNotifiers(notification));
  }

  removeNotification(index): void {
    this.notifications.removeAt(index);
  }

  ngOnInit() {
    this.action = this.data.action;
    if (this.action === 'edit') {
      this.website = this.data.website;
      this.dialogTitle = `Edit ${this.website.name}`;
      this.websiteForm = this.createWebsiteForm();
      if (this.website.websiteUrls) {
        debugger;
        this.website.websiteUrls.forEach(elem => {
          this.addWebsiteUrl(elem.url);
        });
      }
      if (this.website.notifications) {
        this.website.notifications.forEach(elem => {
          this.addNotification(elem);
        });
      }
    } else {
      this.dialogTitle = 'New Website';
      this.website = {
        name: '',
        isActive: false,
        domainKey: '',
        publishDate: '',
        expiryDate: '',
        websiteUrls: [],
        notifications: []
      };
      this.websiteForm = this.createWebsiteForm();
    }
  }

  copySecetKey(text) {
    // Create new element
    const el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = text;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    //el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
    this.snackBar.open('Secret key copied', 'undo', {
      duration: 2000
    });
  }
}
