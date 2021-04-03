import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'

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
    private dialog: MatDialog,
    private dayService: DayService
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

  quickAction(ev: Event, key: string): void {
    ev.stopImmediatePropagation()
    this.day[key] = !this.day[key]
    this.dayService.updateDay(this.day.id, this.dayService.normalizeDay(this.day))
  }

}
