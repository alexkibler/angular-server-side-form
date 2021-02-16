import { QuestionBase } from "./question-base";
import { DropdownQuestion } from "./question-dropdown";
import { TextboxQuestion } from "./question-textbox";
export class QuestionResponseModel {
    questions: (DropdownQuestion | TextboxQuestion)[];
}