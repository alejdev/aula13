import { Component, OnInit, Inject, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime, switchMap } from 'rxjs/operators'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { UtilService } from 'src/app/shared/services/util.service'
import { ToastService } from 'src/app/shared/services/toast.service'
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
  srcImage: any
  classroom: any

  queryClassroomName: any
  observableClassroomName: any
  validatingName: boolean

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private classroomService: ClassroomService,
    private studentService: StudentService,
    private dialogRef: MatDialogRef<ClassroomCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.srcImage = UtilService.srcImage
    this.classroom = this.data.entity

    // Init form controls
    this.classroomFormGroup = this.formBuilder.group({
      nameCtrl: [this.classroom.name || '', Validators.required],
      studentListCtrl: [this.studentIdList || []]
    })

    // If edit
    if (this.classroom.id) {
      this.queryStudentsByClassroom()
    }
    this.onClassroomChange()
  }

  onClassroomChange() {
    const nameCtrl = this.classroomFormGroup.controls.nameCtrl

    this.queryClassroomName = nameCtrl.valueChanges
      .subscribe(() => this.validatingName = true)

    this.observableClassroomName = nameCtrl.valueChanges
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

  queryStudentsByClassroom() {
    this.studentService.queryStudentsByClassroom(this.classroom.id)
      .subscribe((result: any) => {
        this.studentIdList = this.studentService.mapStudentList(result).map((student: any) => student.id)
        this.classroomFormGroup.controls.studentListCtrl.setValue(this.studentIdList)
      })
  }

  getStudentIdList(): any {
    const studentListCtrl = this.classroomFormGroup.value.studentListCtrl
    if (studentListCtrl.hasOwnProperty('studentCtrl')) {
      this.studentIdList = studentListCtrl.studentCtrl
    } else {
      this.studentIdList = studentListCtrl
    }
  }

  mapStudent(student: any): any {
    const classrooms = student.classroom.classrooms
    // Add classroom
    if (this.studentIdList.includes(student.id) && !classrooms.includes(this.classroom.id)) {
      return {
        id: student.id,
        classroom: { classrooms: [...classrooms, this.classroom.id] }
      }
    }
    // Remove classroom
    if (!this.studentIdList.includes(student.id) && classrooms.includes(this.classroom.id)) {
      return {
        id: student.id,
        classroom: { classrooms: classrooms.filter((elem: any) => elem !== this.classroom.id) }
      }
    }
    return
  }

  async saveStudents(): Promise<any> {
    this.getStudentIdList()
    const students = await this.studentService.getStudentList()
    const studentsMap = this.studentService
      .mapStudentList(students)
      .map((student: any) => this.mapStudent(student))
      .filter((student: any) => student)
    return this.studentService.updateStudents(studentsMap)
  }

  save(): void {
    if (this.classroomFormGroup.valid) {
      const classroom = {
        name: UtilService.capitalize(this.classroomFormGroup.value.nameCtrl || '')
      }
      let createClassroom: any
      if (this.data.entity.id) {
        createClassroom = this.classroomService.updateClassroom(this.data.entity.id, classroom)
      } else {
        createClassroom = this.classroomService.createClassroom(classroom)
      }
      createClassroom
        .then((result: any) => {
          // If edit
          this.classroom.id = result ? result.id : this.classroom.id
          this.saveStudents()
          this.toastService.success(`MSG.CLASSROOM_${this.data.entity.id ? 'UPDATE' : 'CREATE'}_OK`)
          this.dialogRef.close(this.data.entity)
        })
        .catch((err: any) => {
          this.toastService.error('ERR.UNEXPECTED_ERROR')
        })
    }
  }

  ngOnDestroy(): void {
    this.queryClassroomName.complete()
    this.observableClassroomName.complete()
  }
}
