import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PupilService, Pupil } from 'src/app/services/pupil.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'a13-pupil-list',
  templateUrl: './pupil-list.component.html',
  styleUrls: ['./pupil-list.component.scss']
})
export class PupilListComponent implements OnInit {

  title: string = 'Alumnos'
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol']
  dataSource = new MatTableDataSource<Pupil>(this.pupilService.getPupilList())
  selection = new SelectionModel<Pupil>(true, [])

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private pupilService: PupilService) { }

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
  checkboxLabel(row?: Pupil): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
