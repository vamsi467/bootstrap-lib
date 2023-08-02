import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-api-response-dialog",
  templateUrl: "./api-response-dialog.component.html",
  styleUrls: ["./api-response-dialog.component.scss"],
})
export class ApiResponseDialogComponent implements OnInit {
  constructor() {}

  @ViewChild("dialog") dialog: DialogComponent; // Reference to the dialog component
  @Input() title: string = ""; // Input property to receive the title for the dialog
  @Input() message: string = ""; // Input property to receive the main message for the dialog
  @Input() errorMessage: string = ""; // Input property to receive the error message for the dialog
  @Input() error = false; // Input property to indicate if the response is an error

  ngOnInit(): void {}

  // Function to close the dialog
  close() {
    this.dialog.close(); // Call the close() function of the referenced dialog component
  }

  // Function to open the dialog
  open() {
    this.dialog.open(); // Call the open() function of the referenced dialog component
  }
}
