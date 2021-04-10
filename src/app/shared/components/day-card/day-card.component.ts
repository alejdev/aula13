import { DayArchiveDialogComponent } from 'src/app/classroom/components/day-archive-dialog/day-archive-dialog.component'
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

  menuOptions: any = {}

  constructor(
    private dialog: MatDialog,
    private dayService: DayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuOptions = [{
      name: 'DAY.EDIT',
      icon: 'pen',
      dialog: {
        component: DayCreationComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            idDay: this.day.id,
            day: { ...this.day }
          }
        }
      }
    }, {
      name: 'DAY.CLONE',
      icon: 'copy',
      dialog: {
        component: DayCreationComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            day: { ...this.day },
            isClone: true
          }
        }
      }
    }, {
      name: `${!this.day.archived ? '' : 'UN'}ARCHIVE_DAY`,
      icon: `box${!this.day.archived ? '' : '-open'}`,
      dialog: {
        component: DayArchiveDialogComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            idDay: this.day.id,
            day: { ...this.day }
          }
        }
      }
    }, {
      name: 'DAY.DELETE',
      icon: 'trash',
      dialog: {
        component: DayDeleteDialogComponent,
        config: {
          ...DIALOG_CONFIG,
          data: {
            day: { ...this.day }
          }
        }
      }
    }]
  }

  goTo() {
    this.router.navigateByUrl(`classroom/day/${this.day.id}`, {
      state: { fromUrl: this.fromUrl }
    })
  }

  quickAction(ev: Event, key: string): void {
    ev.stopImmediatePropagation()
    this.day[key] = !this.day[key]
    this.dayService.updateDay(this.day.id, this.dayService.normalizeDay(this.day))
  }

}
