import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITableColumnOptions } from "../api-table.types";
import { get_deep_value } from "../api-table.utils";

@Component({
  selector: "[table-row]",
  templateUrl: "./table-row.component.html",
  styleUrls: ["./table-row.component.scss"],
})
export class TableRowComponent implements OnInit {
  @Input() row: any = {}; // Input property to receive the data for the row
  @Input() rowIndex: null | number = null; // Input property to receive the index of the row
  @Input() columns: ITableColumnOptions[] = []; // Input property to receive the column options
  @Output() action = new EventEmitter(); // Output property to emit the action event

  constructor() {}

  ngOnInit(): void {}

  // Function to get the value from the row data based on the column accessor
  getValue(row, column: ITableColumnOptions) {
    const val = get_deep_value(row, column.accessor, column.default || "N/A"); // Get the value using the accessor path

    return val; // Return the value
  }

  // Function to handle the action click event and emit the action event with relevant data
  actionHandler(value, column, columnIndex) {
    this.action.emit({
      value, // Value associated with the action
      row: this.row, // Data of the row
      column, // Column options of the clicked action
      rowIndex: this.rowIndex, // Index of the row
      columnIndex, // Index of the clicked action in the column array
    });
  }
}
