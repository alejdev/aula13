import { MatDialogConfig } from '@angular/material'

import { DefaultSetting, InputAppearance, InputAppearanceElement, SocialNetwork } from './interfaces'

// Default app settings
export const DEFAULT_SETTINGS: DefaultSetting = {
  theme: 0,
  lang: 'es',
  canSlideSideMenu: true,
  canSlideRoutes: true,
  inputAppearance: InputAppearance.fill,
  gridStudentLayout: false,
  gridDailyLayout: false
} as const

// Input appearance settings
export const INPUT_APPEARANCE: InputAppearanceElement[] = [{
  name: 'SETTING.INPUT_APPEARANCE_DEFAULT',
  id: InputAppearance.standard,
  icon: 'window-minimize'
}, {
  name: 'SETTING.INPUT_APPEARANCE_OUTLINE',
  id: InputAppearance.outline,
  icon: 'border-style'
}, {
  name: 'SETTING.INPUT_APPEARANCE_FILL',
  id: InputAppearance.fill,
  icon: 'square'
}]

// App date formtas
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

// My custom dialog config
export const DIALOG_CONFIG: MatDialogConfig = {
  width: 'calc(100vw)',
  maxWidth: '800px',
  autoFocus: false,
  disableClose: true,
  panelClass: 'full-dialog'
}

// Skeleton config
export const SKELETON_CONFIG: any = {
  animation: 'progress', // pulse | progress
  search: { theme: { height: '50px', margin: '0 0 2rem 0' } },
  circle: { theme: { width: '80px', height: '80px', margin: '5px 12px 0 .5rem' } },
  circleSmall: { theme: { width: '54px', height: '54px', margin: '0 .5rem 0 0' } },
  lines: [
    { theme: { 'max-width': '250px', height: '12px', 'margin-bottom': '8px' } },
    { theme: { 'max-width': '170px', height: '10px', 'margin-bottom': '5px' } },
    { theme: { 'max-width': '200px', height: '10px', 'margin-bottom': '8px' } },
    { theme: { 'max-width': '350px', height: '15px', 'margin-bottom': '8' } },
    { theme: { 'max-width': '80px', height: '8px', 'margin-bottom': '0' } },
  ],
  linesSmall: [
    { theme: { 'max-width': '220px', height: '12px', 'margin-bottom': '8px' } },
    { theme: { 'max-width': '110px', height: '10px', 'margin-bottom': '0' } },
  ],
  list: [
    { theme: { 'max-width': '90%', height: '50px', margin: '0 0 2rem 0' } },
    { theme: { 'max-width': '100px', height: '20px', margin: '0 0 1rem 0' } },
    { theme: { height: '110px', margin: '0 0 .5rem 0' } },
    { theme: { height: '110px', margin: '0 0 .5rem 0' } },
    { theme: { 'max-width': '90px', height: '20px', margin: '2rem 0 1rem 0' } },
    { theme: { height: '110px', margin: '0 0 .5rem 0' } },
  ],
  listSmall: [
    { theme: { 'max-width': '90%', height: '50px', margin: '0 0 2rem 0' } },
    { theme: { 'max-width': '100px', height: '20px', margin: '0 0 1rem 0' } },
    { theme: { height: '70px', margin: '0 0 .5rem 0' } },
    { theme: { height: '70px', margin: '0 0 .5rem 0' } },
    { theme: { height: '70px', margin: '0 0 .5rem 0' } },
    { theme: { 'max-width': '90px', height: '20px', margin: '2rem 0 1rem 0' } },
    { theme: { height: '70px', margin: '0 0 .5rem 0' } },
    { theme: { height: '70px', margin: '0 0 .5rem 0' } },
  ],
  text: [
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '30%', height: '12px', 'margin-bottom': '30px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '80%', height: '12px', 'margin-bottom': '30px' } },
    { theme: { 'max-width': '40%', height: '12px', 'margin-bottom': '30px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '55%', height: '12px', 'margin-bottom': '30px' } },
    { theme: { 'max-width': '100%', height: '12px', 'margin-bottom': '10px' } },
    { theme: { 'max-width': '75%', height: '12px', 'margin-bottom': '0' } },
  ],
  sidenav: [
    { theme: { height: '30px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '80%', height: '20px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '60%', height: '20px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '70%', height: '20px', 'margin-bottom': '30px' } },
    { theme: { height: '30px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '60%', height: '20px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '50%', height: '20px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '75%', height: '20px', 'margin-bottom': '15px' } },
    { theme: { 'max-width': '65%', height: '20px', 'margin-bottom': '30px' } },
  ]
}

// Ckeditor config
export const CKEDITOR_CONFIG: any = {
  toolbar: ['bold', 'italic', '|', 'heading', 'blockQuote', 'bulletedList', 'numberedList', '|', 'undo', 'redo', '|', 'link', 'insertTable', 'indent', 'outdent'],
  options: [
    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
  ]
}

// Social network list for sign in/up
export const SOCIAL_NETWORK_LIST: SocialNetwork[] = [{
  txt: 'SIGN.IN_WITH_GOOGLE',
  icon: 'google-icon',
  id: 'google',
}, {
  txt: 'SIGN.IN_WITH_FACEBOOK',
  icon: 'facebook-icon',
  id: 'facebook',
}, {
  txt: 'SIGN.IN_WITH_TWITTER',
  icon: 'twitter-icon',
  id: 'twitter',
}]

// Student avatar list
export const AVATAR_LIST: string[] = [
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

// Academic course list for student creation form
export const ACADEMIC_COURSE_LIST: any[] = [{
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

// Conservatory course list for student creation form
export const CONSERVATORY_COURSE_LIST: any[] = [{
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

// Instrument list for student creation form
export const INSTRUMENT_LIST: any[] = [{
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

export const EMOJIS: any[] = ['🤪', '😂', '😄', '😋', '😙', '😗', '😦', '😬', '🤭', '😨', '🤐', '🥴', '😐', '🤨', '😝', '😍', '🥰', '😇', '🙃']
