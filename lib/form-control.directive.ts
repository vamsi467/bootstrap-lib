import { Directive, HostBinding, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Directive({
  selector: "[app-form-control]", // The selector for the directive (using attribute selector)
})
export class FormControlDirective {
  constructor() {}

  @Input() control: FormControl; // Input property to receive the form control associated with the element

  // Host binding to dynamically set the classes for the element
  @HostBinding("class") get classes(): string {
    // Check if the form control is invalid and has been touched (i.e., there is an error)
    if (this.control?.invalid && this.control?.touched) {
      return "form-control is-invalid"; // Return classes for an invalid form control
    }
    // Check if the form control is valid
    if (this.control.valid) {
      return "form-control is-valid"; // Return classes for a valid form control
    }
    // If the form control is neither invalid nor valid, return the default classes
    return "form-control";
  }
}
