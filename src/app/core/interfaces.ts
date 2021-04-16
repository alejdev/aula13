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
