import { Component, Input, OnInit } from '@angular/core';
import { ITableColumnOptions } from '../api-table.types';

@Component({
  selector: '[table-header-row]',
  templateUrl: './table-header-row.component.html',
  styleUrls: ['./table-header-row.component.scss']
})
export class TableHeaderRowComponent implements OnInit {
  @Input() columns: ITableColumnOptions[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
