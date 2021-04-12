import { Subscription } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import { ToastService } from 'src/app/shared/services/toast.service'
import { UtilService } from 'src/app/shared/services/util.service'

import { Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'

import { ClassroomService } from '../../services/classroom.service'
import { StudentService } from '../../services/student.service'

@Component({
  selector: 'a13-classroom-creation',
  templateUrl: './classroom-creation.component.html',
  styleUrls: ['./classroom-creation.component.scss']
})
export class ClassroomCreationComponent implements OnInit, OnDestroy {

  classroomFormGroup: FormGroup
  studentList: any[]
  studentIdList: any[]
  classroom: any

  classroomNameSubscription: Subscription
  queryClassroomNameSubscription: Subscription
  validatingName: boolean

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private translateService: TranslateService,
    private dialogRef: MatDialogRef<ClassroomCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.classroom = this.data.entity

    // Init form controls
    this.classroomFormGroup = this.formBuilder.group({
      nameCtrl: [this.data.isClone ? `${this.translateService.instant('COPY_OF')} ${this.classroom.name}` : this.classroom.name, Validators.required],
      studentListCtrl: [this.studentIdList || []]
    })

    // Listen name changes
    this.onClassroomChange()

    // If edit
    if (this.classroom.id) {
      this.queryEnrrolledStudents()
    }
  }

  ngOnInit() { }

  onClassroomChange() {
    const nameCtrl = this.classroomFormGroup.controls.nameCtrl

    this.classroomNameSubscription = nameCtrl.valueChanges
      .subscribe(() => this.validatingName = true)

    this.queryClassroomNameSubscription = nameCtrl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(() => this.classroomService.queryClassroom(UtilService.capitalize(nameCtrl.value)))
      ).subscribe((result: any) => {
        if (result.length && this.data.entity.name !== result[0].payload.doc.data().name) {
          nameCtrl.setErrors({ nameTaken: true })
        }
        nameCtrl.setErrors(nameCtrl.errors)
        nameCtrl.markAsTouched()
        this.validatingName = false
      })
  }

  async queryEnrrolledStudents(): Promise<any> {
    const students = await this.studentService.queryEnrrolledStudents('classroom.classrooms', this.classroom.id)
    this.studentIdList = students.map((student: any) => student.id)
    this.classroomFormGroup.controls.studentListCtrl.setValue(this.studentIdList)
    if (this.data.isClone) { delete this.classroom.id }
  }

  formatStudentIdList(): any[] {
    const studentListCtrl = this.classroomFormGroup.value.studentListCtrl
    return studentListCtrl.studentCtrl || studentListCtrl
  }

  async updateStudentClassrooms(): Promise<any> {
    const enrrolledStudents = this.formatStudentIdList()
    const students = await this.studentService.getStudentList()
    const studentsMap = students.map((student: any) => {
      const classrooms = student.classroom.classrooms
      if (enrrolledStudents.includes(student.id)) {
        return !classrooms.includes(this.data.entity.id) ? {
          id: student.id,
          classroom: {
            classrooms: [...classrooms, this.data.entity.id],
            subjects: student.classroom.subjects
          }
        } : undefined
      }
      return classrooms.includes(this.data.entity.id) ? {
        id: student.id,
        classroom: {
          classrooms: classrooms.filter((elem: any) => elem !== this.data.entity.id),
          subjects: student.classroom.subjects
        }
      } : undefined
    })
    return this.studentService.updateStudentBatch(studentsMap)
  }

  save(): any {
    if (this.classroomFormGroup.valid && (
      (this.data.entity.id && !this.classroomFormGroup.pristine) || // Edit && pristine
      (!this.data.entity.id) // Create or Clone
    )) {

      const classroom = {
        name: UtilService.capitalize(this.classroomFormGroup.value.nameCtrl || '')
      }

      let setClassroom: any
      if (this.data.entity.id) {
        setClassroom = this.classroomService.updateClassroom(this.data.entity.id, classroom)
      } else {
        setClassroom = this.classroomService.createClassroom(classroom)
      }

      setClassroom
        .then((result: any) => {
          // If edit
          this.classroom.id = result ? result.id : this.classroom.id
          this.updateStudentClassrooms()
          this.dialogRef.close(this.data.entity)

          const navigateTo = {
            text: 'SEE',
            route: ['classroom/students'],
            queryParams: { classroomsFilter: [this.classroom.id], openFilters: true }
          }

          if (!this.data.noToast) {
            if (result && result.id) {// Create
              this.toastService.success({ text: 'MSG.CLASSROOM_CREATE_OK', navigate: navigateTo })
            } else {// Modify
              this.toastService.success({ text: 'MSG.CLASSROOM_UPDATE_OK', navigate: navigateTo })
            }
          }
        })
        .catch((err: any) => {
          this.toastService.error({ text: 'ERR.UNEXPECTED_ERROR' })
        })
    } else if (this.data.entity.id && this.classroomFormGroup.valid) {// If Edit and valid
      this.dialogRef.close()
    }
  }

  cancel(): void {
    if (this.classroomFormGroup.dirty) {
      if (confirm(this.translateService.instant('MSG.WILL_LOSE_THE_CHANGES'))) {
        this.dialogRef.close()
      }
    } else {
      this.dialogRef.close()
    }
  }

  ngOnDestroy(): void {
    this.classroomNameSubscription.unsubscribe()
    this.queryClassroomNameSubscription.unsubscribe()
  }
}
