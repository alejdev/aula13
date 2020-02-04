import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public static ageList: number[] = Array(100).fill(0).map((e, i) => i + 1)

  public static avatarList: string[] = [
    'user-default', 'boy-20', 'girl-9', 'girl-14',
    'boy-15', 'boy-10', 'girl-22', 'girl-1',
    'boy-3', 'boy-6', 'girl-15', 'girl-20',
    'boy-17', 'boy-12', 'girl-17', 'girl-10',
    'boy-8', 'boy-22', 'girl-11', 'girl-2',
    'boy-0', 'boy-7', 'girl-13', 'girl-7',
    'boy-1', 'boy-14', 'girl-5', 'girl-21',
    'boy-19', 'boy-21', 'girl-6', 'girl-18',
    'boy-9', 'boy-4', 'girl-3', 'girl-16',
    'boy-13', 'boy-18', 'girl-19', 'girl-12',
    'boy-16', 'boy-2', 'girl-0', 'girl-4',
    'boy-11', 'boy-5', 'girl-8'
  ]

  public static academicCourseList: any[] = [{
    name: 'FORM.COURSE.PRIMARY',
    groupId: 0,
    group: [
      { id: '0', viewValue: '1º' },
      { id: '1', viewValue: '2º' },
      { id: '2', viewValue: '3º' },
      { id: '3', viewValue: '4º' },
      { id: '4', viewValue: '5º' },
      { id: '5', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SECONDARY',
    groupId: 1,
    group: [
      { id: '6', viewValue: '1º' },
      { id: '7', viewValue: '2º' },
      { id: '8', viewValue: '3º' },
      { id: '9', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.HIGH_SCHOOL',
    groupId: 2,
    group: [
      { id: '10', viewValue: '1º' },
      { id: '11', viewValue: '2º' }
    ]
  }]

  public static conservatoryCourseList: any[] = [{
    name: 'FORM.COURSE.ELEMENTARY',
    groupId: 0,
    group: [
      { id: '0', viewValue: '1º' },
      { id: '1', viewValue: '2º' },
      { id: '2', viewValue: '3º' },
      { id: '3', viewValue: '4º' }
    ]
  }, {
    name: 'FORM.COURSE.PROFESSIONAL',
    groupId: 1,
    group: [
      { id: '4', viewValue: '1º' },
      { id: '5', viewValue: '2º' },
      { id: '6', viewValue: '3º' },
      { id: '7', viewValue: '4º' },
      { id: '8', viewValue: '5º' },
      { id: '9', viewValue: '6º' }
    ]
  }, {
    name: 'FORM.COURSE.SUPERIOR',
    groupId: 2,
    group: [
      { id: '10', viewValue: '1º' },
      { id: '11', viewValue: '2º' },
      { id: '12', viewValue: '3º' },
      { id: '13', viewValue: '4º' },
      { id: '14', viewValue: '5º' }
    ]
  }]

  public static instrumentList: any[] = [{
    name: 'INSTRUMENT.GROUP.STRING',
    groupId: 0,
    group: [
      { id: '0', viewValue: 'VIOLIN' },
      { id: '1', viewValue: 'VIOLA' },
      { id: '2', viewValue: 'CELLO' },
      { id: '3', viewValue: 'DOUBLE_BASS' },
      { id: '4', viewValue: 'PIANO' },
      { id: '5', viewValue: 'GUITAR' },
      { id: '6', viewValue: 'HARP' }
    ]
  }, {
    name: 'INSTRUMENT.GROUP.WIND',
    groupId: 1,
    group: [
      { id: '7', viewValue: 'ACCORDION' },
      { id: '8', viewValue: 'CLARINET' },
      { id: '9', viewValue: 'BASSOON' },
      { id: '10', viewValue: 'BAGPIPE' },
      { id: '11', viewValue: 'FLUTE' },
      { id: '12', viewValue: 'TRANSVERSE_FLUTE' },
      { id: '13', viewValue: 'OBOE' },
      { id: '14', viewValue: 'SAXOPHONE' },
      { id: '15', viewValue: 'TROMBONE' },
      { id: '16', viewValue: 'HORN' },
      { id: '17', viewValue: 'TRUMPET' },
      { id: '18', viewValue: 'TUBA' },
    ]
  }, {
    name: 'INSTRUMENT.GROUP.PERCUSSION',
    groupId: 2,
    group: [
      { id: '19', viewValue: 'PERCUSSION' }
    ]
  }]

  public static studenModel: any = {
    archived: false,
    classroom: {
      classrooms: [],
      subjects: []
    },
    contactInformation: {
      phones: []
    },
    favorite: false,
    musical: {
      group: '',
      instrument: '',
      teacher: ''
    },
    personal: {
      academicCourse: '',
      avatar: 'user-default',
      birthdate: '',
      name: '',
      observations: ''
    }
  }

  public static dayModel: any = {
    content: '',
    date: null,
    studentId: '',
    title: ''
  }

  public static classroomModel: any = {
    name: ''
  }

  public static subjectModel: any = {
    name: ''
  }

  constructor() { }
}
