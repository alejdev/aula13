import moment, { Moment } from 'moment'

import { Injectable } from '@angular/core'

import { UtilService } from './util.service'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public static ageList: number[] = Array(100).fill(0).map((e, i) => i + 1)

  public static inputAppearances: any[] = [{
    name: 'SETTING.INPUT_APPEARANCE_DEFAULT',
    id: 'standard',
    icon: 'grip-lines'
  }, {
    name: 'SETTING.INPUT_APPEARANCE_OUTLINE',
    id: 'outline',
    icon: 'border-style'
  }, {
    name: 'SETTING.INPUT_APPEARANCE_FILL',
    id: 'fill',
    icon: 'square'
  }]

  public static signInSocialNetworks: any[] = [{
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

  public static getQuickDatesModel(today: Moment): any[] {
    return [{
      id: 'allTime',
      name: 'DATES.ALL_TIME',
      since: null,
      until: null,
    }, {
      id: 'today',
      name: 'DATES.TODAY',
      since: UtilService.firstMoment(moment(today)),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'yesterday',
      name: 'DATES.YESTERDAY',
      since: UtilService.firstMoment(moment(today).subtract(1, 'days')),
      until: UtilService.lastMoment(moment(today).subtract(1, 'days')),
    }, {
      id: 'beforeYesterday',
      name: 'DATES.BEFORE_YESTERDAY',
      since: UtilService.firstMoment(moment(today).subtract(2, 'days')),
      until: UtilService.lastMoment(moment(today).subtract(2, 'days')),
    }, {
      id: 'lastWeek',
      name: 'DATES.LAST_WEEK',
      since: UtilService.firstMoment(moment(today).subtract(6, 'days')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'thisWeek',
      name: 'DATES.THIS_WEEK',
      since: moment(today).clone().startOf('isoWeek'),
      until: moment(today).clone().endOf('isoWeek'),
    }, {
      id: 'pastWeek',
      name: 'DATES.PAST_WEEK',
      since: moment(today).clone().startOf('isoWeek').subtract(1, 'week'),
      until: moment(today).clone().endOf('isoWeek').subtract(1, 'week'),
    }, {
      id: 'last15Days',
      name: 'DATES.LAST_15DAYS',
      since: UtilService.firstMoment(moment(today).subtract(14, 'days')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'lastMonth',
      name: 'DATES.LAST_MONTH',
      since: UtilService.firstMoment(moment(today).subtract(29, 'days')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'thisMonth',
      name: 'DATES.THIS_MONTH',
      since: moment(today).clone().startOf('month'),
      until: moment(today).clone().endOf('month'),
    }, {
      id: 'pastMonth',
      name: 'DATES.PAST_MONTH',
      since: moment(today).clone().startOf('month').subtract(1, 'month'),
      until: moment(today).clone().endOf('month').subtract(1, 'month'),
    }, {
      id: 'last3Month',
      name: 'DATES.LAST_3MONTH',
      since: UtilService.firstMoment(moment(today).subtract(3, 'months')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'last6Month',
      name: 'DATES.LAST_6MONTH',
      since: UtilService.firstMoment(moment(today).subtract(6, 'months')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'lastYear',
      name: 'DATES.LAST_YEAR',
      since: UtilService.firstMoment(moment(today).subtract(1, 'years')),
      until: UtilService.lastMoment(moment(today)),
    }, {
      id: 'thisYear',
      name: 'DATES.THIS_YEAR',
      since: moment(today).clone().startOf('year'),
      until: moment(today).clone().endOf('year'),
    }, {
      id: 'pastYear',
      name: 'DATES.PAST_YEAR',
      since: moment(today).clone().startOf('year').subtract(1, 'year'),
      until: moment(today).clone().endOf('year').subtract(1, 'year'),
    }]
  }

  constructor() { }
}
