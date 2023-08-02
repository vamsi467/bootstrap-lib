import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITableFilter } from "../api-table.types";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  @Input() filters: ITableFilter[] = []; // Input property to receive the filters from the parent component
  @Output() filterChange: EventEmitter<any> = new EventEmitter(); // Output property to emit the filter change event
  filterData = {}; // Object to store the selected filter data

  constructor() {}

  ngOnInit(): void {}

  // Function to set the selected filter value and emit the filter change event
  setFilterValue(event, filter) {
    this.filterData[filter.value] = event.target.value; // Store the selected value in the filterData object
    this.filterChange.emit(this.filterData); // Emit the filter change event along with the updated filter data
  }
}
