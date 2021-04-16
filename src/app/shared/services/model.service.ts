import moment from 'moment'

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

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
