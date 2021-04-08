import { DayDeleteDialogComponent } from 'src/app/classroom/components/day-delete-dialog/day-delete-dialog.component'
import { DayService } from 'src/app/classroom/services/day.service'
import { DIALOG_CONFIG } from 'src/app/core/core.module'

import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

import { DayCreationComponent } from '../day-creation/day-creation.component'

@Component({
  selector: 'a13-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss']
})
export class DayCardComponent implements OnInit {

  @Input() day: any = null
  @Input() fromUrl: string = ''

  constructor(
    private dialog: MatDialog,
    private dayService: DayService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  goTo() {
    this.router.navigateByUrl(`aula/dia/${this.day.id}`, {
      state: { fromUrl: this.fromUrl }
    })
  }

  editDay(ev: Event) {
    ev.stopImmediatePropagation()
    this.dialog.open(DayCreationComponent, {
      ...DIALOG_CONFIG,
      data: {
        idDay: this.day.id,
        day: { ...this.day }
      }
    })
  }

  deleteDay(ev: Event) {
    ev.stopImmediatePropagation()
    this.dialog.open(DayDeleteDialogComponent, {
      ...DIALOG_CONFIG,
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
