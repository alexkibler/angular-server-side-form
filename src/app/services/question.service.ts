import { Injectable } from "@angular/core";

import { DropdownQuestion } from "../models/question-dropdown";
import { QuestionBase } from "../models/question-base";
import { TextboxQuestion } from "../models/question-textbox";
import { of, pipe } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { QuestionResponseModel } from "../models/question-response-model";
import { DateQuestion } from "../models/question-date";
import { QuestionControlService } from "./question-control.service";

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient, private questionControlService: QuestionControlService){}
  // TODO: get from a remote source of question metadata
  getQuestions(country: string) {
    return this.http.get<QuestionResponseModel>(`assets/questions-${country}.json`).pipe(map(response => {
      
      const questions = response.questions.map(question => {
        return this.questionControlService.toFormControl(question);
      })
      return questions.sort((a, b) => a.order - b.order);
    }));
  }
}
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
