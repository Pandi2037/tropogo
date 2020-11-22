import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import * as results from '../assets/mockdata.json';
import * as data from '../assets/mockdefaultvalue.json';
import { AppDateAdapter } from './date.adapter';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }]
})
export class AppComponent implements OnInit {
  public courseForm: FormGroup;

  courseLocation = data.courseLocation;
  courseLanguage = data.courseLanguage;

  // Photos Maximum count validator
  photosValidator = (form: FormArray) => {
    if (form.controls.length > 6) {
      form.controls.splice(6);
      return {
        invalidLength: true
      };
    }
    return null;
  }

  constructor(private formBuilder: FormBuilder) {
    this.courseForm = this.formBuilder.group({
      courseName: [results.courseName, Validators.required],
      photos: this.formBuilder.array(results.previousCourseGallery, [this.photosValidator]),
      aircraftType: [results.aircraftType, Validators.required],
      batchInfo: this.formBuilder.array([this.buildBatchInfo()]),
      courseDetails: [results.courseDetails]
    });
  }

  ngOnInit(): void {
    this.batchInfo.patchValue(results.batchInfo);
  }


  buildBatchInfo(): FormGroup {
    return this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      courseLocation: ['', Validators.required],
      courseLanguage: [[], Validators.maxLength(2)],
      courseCost: ['', Validators.required],
      isWeekEndCourse: ['', Validators.required],
    });
  }

  // create photo.
  createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  // Help to get all photos controls as form array.
  get photos(): FormArray {
    return this.courseForm.get('photos') as FormArray;
  }

  // Get Batch Information
  get batchInfo(): FormArray {
    return this.courseForm.get('batchInfo') as FormArray;
  }

  // Detect photos and add
  detectFiles(event: any): void {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(this.createItem({
            file,
            url: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // remove photo
  removePhoto(i: any): void {
    this.photos.removeAt(i);
  }

  // Add new course
  addNewCourse(): void {
    console.log(this.batchInfo);
    this.batchInfo.push(this.buildBatchInfo());
  }

  // Refresh course
  refreshCourse(i): void {
    this.batchInfo.controls[i] = this.buildBatchInfo();
  }

  // delete course
  deleteCourse(i): void {
    this.batchInfo.removeAt(i);
  }

  // savecourse
  saveCourse(): void {
    if (this.batchInfo.invalid) {
      return;
    }
    alert('Successfully added');
  }
}
