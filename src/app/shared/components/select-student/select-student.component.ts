import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { StudentService } from 'src/app/classroom/services/student.service'
import { Student } from 'src/app/core/interfaces'
import { SKELETON_CONFIG } from 'src/app/core/settings'

import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms'

import { UtilService } from '../../services/util.service'

@Component({
  selector: 'a13-select-student',
  templateUrl: './select-student.component.html',
  styleUrls: ['./select-student.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectStudentComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SelectStudentComponent),
    multi: true
  }]
})
export class SelectStudentComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() multiple: boolean
  @Input() hint: string

  data$: Observable<any>

  studentFormGroup$: Subscription
  studentFormGroup: FormGroup

  equals: any = UtilService.equals
  skeleton: any = SKELETON_CONFIG

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.data$ = this.studentService.observeStudentList().pipe(
      map((result) => {
        const studentList = UtilService.mapCollection(result)
        return studentList
          .filter((student: Student) => !student.archived)
          .concat(studentList.filter((student: any) => student.archived))
      })
    )

    this.studentFormGroup = this.formBuilder.group({
      studentCtrl: [null]
    })
  }

  onTouched: () => void = () => { }

  writeValue(val: any): void {
    this.studentFormGroup.controls.studentCtrl.setValue(val, { emitEvent: false })
  }

  registerOnChange(fn: any): void {
    this.studentFormGroup$ = this.studentFormGroup.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.studentFormGroup.disable() : this.studentFormGroup.enable()
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.studentFormGroup.valid
      ? null
      : {
        invalidForm: {
          valid: false,
          message: 'studentFormGroup field is invalid'
        }
      }
  }

  ngOnDestroy(): void {
    this.studentFormGroup$.unsubscribe()
  }
}
