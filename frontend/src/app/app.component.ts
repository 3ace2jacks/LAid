import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { CourseBox } from './Course/CourseBox'; 
import { API_Table } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class AppComponent {
	courseName = "Fagnavn";

	ngOnInit(): void {
    this.appService
      .getTables()
      .then( tables => { 
        for (let tableObj of tables) { 
          this.availableTables.push( tableObj.name ) 
        }
      });
  }

  tableChanged(): void {    
    this.appService
      .getColumns(this.selectedTable)
      .then( columns => this.availableColumns = columns );

    this.selectedColumns = [];
  }

  columnsChanged(): void {
    this.tableData = [];
  }

  dataButtonClicked(columnList: string): void {
    columnList = this.selectedColumns.join(',');
    this.appService
      .getTableData( this.selectedTable, columnList )
      .then( data => this.tableData = data );
  }
}
