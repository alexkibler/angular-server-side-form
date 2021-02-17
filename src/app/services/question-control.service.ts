import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../models/question-base';
import { DateQuestion } from '../models/question-date';
import { DropdownQuestion } from '../models/question-dropdown';
import { TextboxQuestion } from '../models/question-textbox';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = new FormControl(question.value || '');
      if (question.validators) {
        const validators = question.validators.map(validator => {
          switch (validator.name) {
            case 'minLength':
              return Validators.minLength(<number>validator.value);
            case 'required':
              return Validators.required; // any value in validator.value for required will add Required.  If you don't want it, don't put a required validator
            default:
              throw `No case set up yet for ${validator.name} validator`
          }
        });
        (<FormControl>group[question.key]).setValidators(validators);
      }
    });
    return new FormGroup(group);
  }

  toFormControl(question: QuestionBase<any>): QuestionBase<any> {
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
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/