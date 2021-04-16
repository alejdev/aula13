import { Classroom, Day, Student, Subject } from './interfaces'

export const STUDENT_MODEL: Student = {
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
    course: null,
    instrument: null,
    teacher: ''
  },
  personal: {
    academicCourse: null,
    avatar: 'user-default',
    birthdate: '',
    name: '',
    observations: ''
  }
}

export const DAY_MODEL: Day = {
  content: '',
  date: null,
  studentId: '',
  title: ''
}

export const CLASSROOM_MODEL: Classroom = {
  name: ''
}

export const SUBJECT_MODEL: Subject = {
  name: ''
}
