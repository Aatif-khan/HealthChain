import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationProvider } from '../../providers/validation/validation';

/**
 * Generated class for the ControlMessagesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'control-messages',
  template: `<div style="padding-left: 5%;float: left;color: red;" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() { 
    for (let errorType in this.control.errors) {
      if (this.control.errors.hasOwnProperty(errorType) && this.control.touched) {
        return ValidationProvider.getValidatorErrorMessage(errorType, this.control.errors[errorType]);
      }
    }

    return null;
  }
}
