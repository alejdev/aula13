import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { StudentService } from 'src/app/classroom/services/student.service'
import { UtilService } from 'src/app/shared/services/util.service'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  mark: any
  studentId: any
  student: any
  srcImage: any

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    // Get param id
    this.activatedRoute.params.subscribe(params => this.studentId = params.id)

    // Get student
    this.studentService.readStudent(this.studentId)
      .then((result) => {
        this.student = result.data()
      })

    this.mark = this.utilService.mark
    this.srcImage = this.utilService.srcImage
  }

}
