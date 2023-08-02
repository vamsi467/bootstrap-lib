// The imports required for the component and the necessary interfaces are defined here
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ITableColumnOptions, ITableFilter } from "./api-table.types";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { LoggerService } from "src/app/shared/services/logger.service";
import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from "rxjs/operators";

// Interface to define the shape of the data source used in the component
interface IDataSource {
  list: any[];
  itemCount: number;
}

@Component({
  selector: "app-api-table",
  templateUrl: "./api-table.component.html",
  styleUrls: ["./api-table.component.scss"],
})
export class ApiTableComponent implements OnInit, AfterViewInit {
  
  @Input() title: string = "";
  @Input() columns: ITableColumnOptions[] = [];
  @Input() entity: string = "";
  @Input() params: HttpParams | { [param: string]: string };
  @Input() filters: ITableFilter[] = [];
  @Input() emptyStateTitle: string = "No data";
  @Input() emptyStateSubtitle: string = "No data found for this selection";
  @Output() action = new EventEmitter(); // Event emitter to handle actions from the table
  @ViewChild("searchInput") searchInput: any;
  searchTerm: string = "";
  filterData: any = {};
  dataSource: IDataSource = { list: [], itemCount: 0 }; // Object to hold the table data
  adminBaseUrl: string = environment.adminApiUrl; // Base URL for the API endpoint
  loading: boolean;
  pageSize: number = 10; // Number of items displayed per page
  pageNumber: number = 1; // Current page number

  constructor(private http: HttpClient, private logger: LoggerService) {}

  ngOnInit(): void {
    this.getEntities(); // Fetch initial table data
  }

  ngAfterViewInit() {
    // Event listener for the search input to trigger filtering
    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          this.pageNumber = 1; // Reset page number when searching/filtering
          this.getEntities();
        })
      )
      .subscribe();
  }

  // Todo: Move the getEntities function to a service for better code organization
  // Function to fetch data from the API based on the entity, filters, and search term
  getEntities() {
    if (this.entity) {
      const params = {
        ...this.params,
        ...this.filterData,
        // todo: uncomment this once the search is done
        // searchTerm: this.searchTerm,
        sort: "desc",
        pageNumber: this.pageNumber.toString(),
        pageSize: this.pageSize.toString(),
      };
      const filteredParams = Object.keys(params).reduce((acc, key) => {
        if (params[key]) {
          acc[key] = params[key];
        }
        return acc;
      }, {});

      this.loading = true;
      this.http
        .get(`${this.adminBaseUrl}/${this.entity}`, {
          params: filteredParams,
        })
        .subscribe(
          (res: any) => {
            this.loading = false;
            if (res.success) {
              this.dataSource = res.data; // Set the fetched data to the data source
            } else {
              this.logger.error(res.message);
            }
          },
          (err) => {
            this.loading = false;
            this.logger.error(err);
          }
        );
    }
  }

  // Function to handle actions triggered from the table
  actionHandler(event) {
    this.action.emit(event);
  }

  // Function to handle filter changes
  filterChangeHandler(event) {
    this.pageNumber = 1; // Reset page number when changing filters
    this.filterData = event; // Store the filter data
    this.getEntities(); // Fetch data with the updated filters
  }

  // Function to handle search action
  search() {
    this.getEntities();
  }

  // Function to handle pagination
  paginate(event) {
    this.pageNumber = event; // Set the current page number
    this.getEntities(); // Fetch data for the selected page
  }
}
