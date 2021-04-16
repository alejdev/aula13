export enum InputAppearance {
  standard = 'standard',
  outline = 'outline',
  fill = 'fill'
}

export interface InputAppearanceElement {
  name: string,
  id: InputAppearance,
  icon: string
}

export interface DefaultSetting {
  theme?: number
  lang?: string
  canSlideSideMenu?: boolean
  canSlideRoutes?: boolean
  inputAppearance?: InputAppearance,
  gridStudentLayout?: boolean
  gridDailyLayout?: boolean
}

export interface SocialNetwork {
  txt: string,
  icon: string,
  id: string,
}

export interface Classroom {
  name: string
}

export interface Subject {
  name: string
}

export interface Phone {
  name: string,
  number: string
}

export interface Course {
  id: string,
  viewValue: string
}

export interface Instrument {
  id: string,
  viewValue: string
}

export interface AcademicCourse {
  id: string,
  viewValue: string
}

export interface Student {
  archived: boolean,
  classroom: {
    classrooms: Classroom[],
    subjects: Subject[]
  },
  contactInformation: {
    phones: Phone[]
  },
  favorite: boolean,
  musical: {
    course: Course,
    instrument: Instrument,
    teacher: string
  },
  personal: {
    academicCourse: AcademicCourse,
    avatar: string,
    birthdate: string,
    name: string,
    observations: string
  }
}

export interface Day {
  content: string,
  date: number,
  studentId: string,
  title: string
}
