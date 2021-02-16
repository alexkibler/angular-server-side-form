# Dynamic Angular Forms with server-side configuration

Threw together a quick repo based on the official angular [dynamic forms example](https://angular.io/generated/live-examples/dynamic-form/stackblitz.html).


In `assets/` there are two json files `questions-AU.json` and `questions-GB.json`.  Each one contains an array of questions.  On app startup, if you click either button, it will load that json file and dynamically build a form based on those questions.

Still to come: 
1. More question types (currently only dropdown and textbox are supported)
2. More validators (custom and out of the box)