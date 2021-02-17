import { Component } from '@angular/core';

import { QuestionBase } from './models/question-base';
import { Observable } from 'rxjs';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <button (click)="getQuestions('AU')">Get AU Questions</button>
      <button (click)="getQuestions('GB')">Get GB Questions</button>
      <app-dynamic-form [questions]="questions" *ngIf="questions"></app-dynamic-form>
    </div>
  `
})
export class AppComponent {
  questions: QuestionBase<any>[];

  constructor(private questionService: QuestionService) {
  }

  getQuestions(country: string) {
    
    this.questionService.getQuestions(country).subscribe(questions => {
      this.questions = questions;
    });

  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/