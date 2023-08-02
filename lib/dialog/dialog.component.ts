import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  @Input() icon = ""; // Input property to receive the icon for the dialog header
  @Input() title = ""; // Input property to receive the title for the dialog header
  @Input() showClose = true; // Input property to determine whether to display the close icon or not
  @ViewChild("content") content: any; // Reference to the content of the dialog template
  @Output() closed = new EventEmitter(); // Output property to emit an event when the dialog is closed

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  // Function to open the modal dialog
  public open() {
    this.modalService.open(this.content, { centered: true }); // Open the modal using the NgbModal service
  }

  // Function to close the modal dialog
  public close() {
    this.modalService.dismissAll(); // Close all opened modals (dismiss the current modal)
    this.closed.emit(); // Emit the 'closed' event when the dialog is closed
  }
}
