import { Classroom, Day, Student, Subject, User } from './interfaces'

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
  archived: false,
  content: '',
  date: null,
  favorite: false,
  studentId: '',
  title: '',
}

export const CLASSROOM_MODEL: Classroom = {
  name: ''
}

export const SUBJECT_MODEL: Subject = {
  name: ''
}

export const USER_MODEL: User = {
  avatar: null,
  creationDate: null,
  email: null,
  id: null,
  name: null,
}
