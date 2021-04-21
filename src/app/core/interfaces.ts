export enum Theme {
  dark = 'dark-theme',
  light = 'light-theme',
}

export interface ThemeElement {
  icon: string
  id: Theme
  isDark: boolean
  name: string
}

export enum Language {
  de = 'de',
  en = 'en',
  es = 'es',
  fr = 'fr',
  it = 'it',
}

export interface LanguageElement {
  id: Language
  name: string
  tip: string
}

export enum InputAppearance {
  fill = 'fill',
  outline = 'outline',
  standard = 'standard',
}

export interface InputAppearanceElement {
  icon: string
  id: InputAppearance
  name: string
}

export interface DefaultSetting {
  canSlideRoutes?: boolean
  canSlideSideMenu?: boolean
  gridDailyLayout?: boolean
  gridStudentLayout?: boolean
  inputAppearance?: InputAppearance
  lang?: string
  theme?: number
}

export interface HeaderConfig {
  back?: boolean
  day?: Day
  length?: number
  menuOptions?: any
  showLogo?: boolean
  showProfile?: boolean
  student?: Student
  title?: string
  truncable?: boolean
}

export interface LogoConfig {
  color?: string // blue|black|transparent
  imageInvertedIfDarkTheme?: boolean
  shake?: boolean
  showLogo?: boolean
  showTagline?: boolean
  showTitle?: boolean
  size?: string
}

export interface SocialNetwork {
  icon: string
  id: string
  txt: string
}

export interface Classroom {
  name: string
  id?: string
}

export interface Subject {
  name: string
  id?: string
}

export interface Phone {
  name: string
  number: string
}

export interface ConservatoryCourse {
  id: string
  viewValue: string
}

export interface Instrument {
  id: string
  viewValue: string
}

export interface AcademicCourse {
  id: string
  viewValue: string
}

export interface Student {
  archived: boolean
  classroom: {
    classrooms: Classroom[]
    subjects: Subject[]
  },
  classrooms?: Classroom[] // Temp
  contactInformation: {
    phones: Phone[]
  }
  favorite: boolean
  id?: string // Temp
  musical: {
    course: ConservatoryCourse
    instrument: Instrument
    teacher: string
  }
  personal: {
    academicCourse: AcademicCourse
    avatar: string
    birthdate: string
    name: string
    observations: string
  }
  subjects?: Subject[] // Temp
}

export interface Day {
  archived: boolean
  content: string
  date: number
  favorite: boolean
  hideStudent?: boolean // Temp
  id?: string // Temp
  student?: Student // Temp
  studentId: string
  subjectId: string
  title: string
}

export interface User {
  avatar: string
  creationDate: string
  email: string
  id: string
  name: string
}
