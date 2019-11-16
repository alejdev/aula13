import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'

import { StudentService } from 'src/app/classroom/services/student.service'

@Component({
  selector: 'a13-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {

  student: any

  ages: number[] = [] // = [...Array(100).keys()]
  academicCourses: any[] = [{
    name: 'FORM.COURSE.PRIMARY',
    group: [
      { value: '0', viewValue: '1º' },
      { value: '1', viewValue: '2º' },
      { value: '2', viewValue: '3º' },
      { value: '3', viewValue: '4º' },
      { value: '4', viewValue: '5º' },
      { value: '5', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SECONDARY',
    group: [
      { value: '6', viewValue: '1º' },
      { value: '7', viewValue: '2º' },
      { value: '8', viewValue: '3º' },
      { value: '9', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.HIGH_SCHOOL',
    group: [
      { value: '10', viewValue: '1º' },
      { value: '11', viewValue: '2º' }
    ]
  }]
  conservatoryCourses: any[] = [{
    name: 'FORM.COURSE.ELEMENTARY',
    group: [
      { value: '0', viewValue: '1º' },
      { value: '1', viewValue: '2º' },
      { value: '2', viewValue: '3º' },
      { value: '3', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.PROFESSIONAL',
    group: [
      { value: '4', viewValue: '1º' },
      { value: '5', viewValue: '2º' },
      { value: '6', viewValue: '3º' },
      { value: '7', viewValue: '4º' },
      { value: '8', viewValue: '5º' },
      { value: '9', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SUPERIOR',
    group: [
      { value: '10', viewValue: '1º' },
      { value: '11', viewValue: '2º' },
      { value: '12', viewValue: '3º' },
      { value: '13', viewValue: '4º' },
      { value: '14', viewValue: '5º' }
    ]
  }]
  instruments: any[] = [{
    name: 'INSTRUMENTS.GROUP.STRING',
    group: [
      { value: '5', viewValue: 'INSTRUMENT.VIOLIN' },
      { value: '4', viewValue: 'INSTRUMENT.VIOLA' },
      { value: '6', viewValue: 'INSTRUMENT.CELLO' },
      { value: '1', viewValue: 'INSTRUMENT.DOUBLE_BASS' },
      { value: '3', viewValue: 'INSTRUMENT.PIANO' },
      { value: '2', viewValue: 'INSTRUMENT.GUITAR' },
      { value: '0', viewValue: 'INSTRUMENT.HARP' }
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.WIND',
    group: [
      { value: '7', viewValue: 'INSTRUMENT.ACCORDION' },
      { value: '8', viewValue: 'INSTRUMENT.CLARINET' },
      { value: '9', viewValue: 'INSTRUMENT.BASSOON' },
      { value: '10', viewValue: 'INSTRUMENT.BAGPIPE' },
      { value: '11', viewValue: 'INSTRUMENT.FLUTE' },
      { value: '12', viewValue: 'INSTRUMENT.TRANSVERSE_FLUTE' },
      { value: '13', viewValue: 'INSTRUMENT.OBOE' },
      { value: '14', viewValue: 'INSTRUMENT.SAXOPHONE' },
      { value: '15', viewValue: 'INSTRUMENT.TROMBONE' },
      { value: '16', viewValue: 'INSTRUMENT.HORN' },
      { value: '17', viewValue: 'INSTRUMENT.TRUMPET' },
      { value: '18', viewValue: 'INSTRUMENT.TUBA' },
      { value: '19', viewValue: 'INSTRUMENT.TXISTU' }
    ]
  }, {
    name: 'INSTRUMENTS.GROUP.PERCUSSION',
    group: [
      { value: '20', viewValue: 'INSTRUMENT.CLAVE' },
      { value: '21', viewValue: 'INSTRUMENT.PERCUSSION' }
    ]
  }]
  subjects: any[] = []

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    for (let i = 0; i < 100; i++) {
      this.ages.push(i)
    }

    this.student = {
      musical: {},
      personal: {
        father: {},
        mother: {}
      }
    }
  }

}
