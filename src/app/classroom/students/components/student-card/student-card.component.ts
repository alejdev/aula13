import { Component, Input, OnInit } from '@angular/core'

import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentComponent implements OnInit {

  @Input() student: any = null
  resourceImagePath: string = 'assets/svgs/avatars/'
  mark: any

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.mark = this.utilService.mark
  }
}
