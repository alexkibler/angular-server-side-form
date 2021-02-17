import { Injectable } from "@angular/core";

import { DropdownQuestion } from "../models/question-dropdown";
import { QuestionBase } from "../models/question-base";
import { TextboxQuestion } from "../models/question-textbox";
import { of, pipe } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { QuestionResponseModel } from "../models/question-response-model";
import { DateQuestion } from "../models/question-date";

@Injectable()
export class QuestionService {
  constructor(private http: HttpClient){}
  // TODO: get from a remote source of question metadata
  getQuestions(country: string) {
    return this.http.get<QuestionResponseModel>(`assets/questions-${country}.json`).pipe(map(response => {
      
      const questions = response.questions.map(question => {
        switch (question.controlType) {
          case 'dropdown':
            return new DropdownQuestion({...question});
          case 'textbox':
            return new TextboxQuestion({...question});
          case 'date':
            return new DateQuestion({...question});
          default:
            throw `Question controlType ${question.controlType} not recognized`;
        }

      })
      return questions.sort((a, b) => a.order - b.order);
    }));
  }
}
  // const australiaQuestions: QuestionBase<string>[] = [
  //     new DropdownQuestion({
  //       key: "brave",
  //       label: "Bravery Rating",
  //       options: [
  //         { key: "solid", value: "Solid" },
  //         { key: "great", value: "Great" },
  //         { key: "good", value: "Good" },
  //         { key: "unproven", value: "Unproven" }
  //       ],
  //       order: 2
  //     }),

  //     new TextboxQuestion({
  //       key: "firstName",
  //       label: "First name",
  //       value: "Bombasto",
  //       required: true,
  //       order: 0
  //     }),

  //     new TextboxQuestion({
  //       key: "emailAddress",
  //       label: "Email",
  //       type: "email",
  //       order: 1
  //     })
  //   ];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
