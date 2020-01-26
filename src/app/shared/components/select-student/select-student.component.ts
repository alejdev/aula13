import { Component, OnInit, Input, OnDestroy, forwardRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms'

import { StudentService } from 'src/app/classroom/services/student.service'
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

  studentFormGroup: FormGroup
  studentList: any[]
  studentListObservable: any
  ready: boolean

  srcImage: any
  equals: any

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.srcImage = UtilService.srcImage
    this.equals = UtilService.equals

    this.studentListObservable = this.studentService.observeStudentList()
      .subscribe((result: any) => {
        this.studentList = this.studentService.mapStudentList(result).filter((student: any) => !student.archived)
      })

    this.studentFormGroup = this.formBuilder.group({
      studentCtrl: [null, Validators.required]
    })
  }

  onTouched: () => void = () => { }

  writeValue(val: any): void {
    this.studentFormGroup.controls.studentCtrl.setValue(val, { emitEvent: false })
  }

  registerOnChange(fn: any): void {
    this.studentFormGroup.valueChanges.subscribe(fn)
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
    this.studentListObservable.complete()
  }
}
