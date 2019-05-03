import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService, Student } from 'src/app/services/student.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'a13-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  title: string = 'Alumnos'
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol']
  dataSource = new MatTableDataSource<Student>(this.studentService.getStudentList())
  selection = new SelectionModel<Student>(true, [])

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  /**
   * Aplica un filtro a la tabla
   * @param filterValue filtro
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Comprueba si todos los elementos están seleccionados
   */
  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  /**
   * Selecciona todos o ningún elemento
   */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** 
   * Label del checkbox
   */
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
