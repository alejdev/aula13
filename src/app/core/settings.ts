import { MatDialogConfig } from '@angular/material'

import { DefaultSetting, InputAppearance, InputAppearanceElement } from './interfaces'

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
