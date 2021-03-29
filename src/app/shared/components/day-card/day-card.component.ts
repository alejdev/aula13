import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'

import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'

import { DayCreationComponent } from '../day-creation/day-creation.component'

@Component({
  selector: 'a13-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

  @Input() day: any = null

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  editDay(ev: Event) {
    ev.stopImmediatePropagation()
    this.dialog.open(DayCreationComponent, {
      width: 'calc(100vw)',
      maxWidth: '800px',
      autoFocus: false,
      disableClose: true,
      data: {
        idDay: this.day.id,
        day: { ...this.day }
      }
    })
  }

  deleteDay(ev: Event) {
    ev.stopImmediatePropagation()
    this.dialog.open(DayDeleteDialogComponent, {
      autoFocus: false,
      data: {
        idDay: this.day.id,
        day: { ...this.day }
      }
    })
  }

}
